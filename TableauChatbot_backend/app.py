import logging
from flask import Flask, request, jsonify
from flask_cors import CORS
from DB.SqlServer import SqlServer
from DB.DatabaseConnection import SQLQuery

app = Flask(__name__)
CORS(app)
sqlQueryObj = SQLQuery()


@app.route("/chat", methods=["POST"])
def chat():
    try:
        dashboardId = request.json["dashboardId"]
        history = request.json["history"]

        query = request.json.get("query")
        r = sqlQueryObj.ask(query, history)
        return jsonify(r)
    except Exception as e:
        logging.exception("Exception in chat: ", e)
        return {
            "data_points": "Na",
            "answer": f"An Unexpected error has occurred. Restart the application and if the issue persists, contact our technical team at tech.CustomerCare@client.com",
            "thoughts": f"Searched for:<br><br><br>Prompt:<br>",
        }


@app.route("/logActivity", methods=["POST"])
def logActivity():
    description = request.args.get("description")
    link = request.args.get("link")
    sql = SqlServer()
    res = sql.insertUserActivity(description, link)
    if not res:
        return jsonify({"error": "Search term is required"}), 400
    else:
        return jsonify({"insertStatus": True})


@app.route("/logActivity", methods=["GET"])
def getLogActivity():

    sql = SqlServer()
    res = sql.getRecentActivity()
    if not res:
        return jsonify({"error": "Search term is required"}), 400
    else:
        return jsonify({"logActivities": res})


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)
