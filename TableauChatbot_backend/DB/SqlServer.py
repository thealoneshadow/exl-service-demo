from sqlalchemy import create_engine, text, MetaData, Table, select, and_, insert
import logging
import random
import datetime


class SqlServer(object):
    def __init__(self):
        try:
            self.engine = create_engine(
                "mssql+pyodbc://@"
                + "DESKTOP-VRMNLFD"
                + "/"
                + "MedicareSales"
                + "?trusted_connection=yes&driver=ODBC+Driver+17+for+SQL+Server"
            )
            with self.engine.connect() as conn:
                metadata = MetaData()
                self.log = Table(
                    "UserOperation", metadata, autoload=True, autoload_with=self.engine
                )

        except:
            print(
                "An Error occurred while connecting to DB. Please restart the server."
            )

    def getRecentActivity(self):

        query = select([self.log]).order_by(self.log.columns.ID.desc()).limit(5)
        ResultProxy = self.engine.execute(query)
        ResultSet = ResultProxy.fetchall()
        return self.formatData(ResultSet)

    def insertUserActivity(self, description, link):
        # get recent reqId
        try:

            # insert into DB
            query = insert(self.log).values(Description=description, Link=link)
            self.engine.execute(query)

            return True
        except Exception as e:
            logging.exception("Exception in /chat")
            return False

    def formatData(self, results):
        if len(results) == 0:
            return ""
        columns = results[0].keys()
        formattedDataList = []
        for result in results:
            D = dict()
            for column, rowData in zip(columns, result):
                D[column] = rowData
            formattedDataList.append(D)
        return formattedDataList

    # def getLatestRequestId(self):
    #     query = (
    #         select([self.invoiceBlob.columns.ReqId])
    #         .order_by(self.invoiceBlob.columns.ReqId.desc())
    #         .limit(1)
    #     )
    #     ResultProxy = self.engine.execute(query)
    #     ResultSet = ResultProxy.fetchall()
    #     if len(ResultSet) == 0:
    #         return "REQ001"
    #     formattedDataList = []
    #     for result in ResultSet:
    #         text = ""
    #         for rowData in result:
    #             text += f"{rowData} "
    #         formattedDataList.append(text)
    #     reqId = formattedDataList[0]
    #     reqIdNumber = "REQ" + str(int(reqId[3:]) + 1).zfill(3)
    #     return reqIdNumber
