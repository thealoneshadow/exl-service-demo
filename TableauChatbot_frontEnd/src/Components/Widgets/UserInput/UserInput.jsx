import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";
import "./UserInput.css";

export default function UserInput(props) {
  const [customerName, setCustomerNameValue] = useState("");
  const [date, setDateValue] = useState("");
  const [isVisible, setIsVisibleValue] = useState(true);
  const categories = [
    { name: "Wellness", key: "W" },
    { name: "Implementation", key: "I" },
  ];
  const [selectedCategories, setSelectedCategories] = useState([categories[0]]);

  const onCategoryChange = (e) => {
    let _selectedCategories = [...selectedCategories];

    if (e.checked) _selectedCategories.push(e.value);
    else
      _selectedCategories = _selectedCategories.filter(
        (category) => category.key !== e.value.key
      );

    setSelectedCategories(_selectedCategories);

  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsVisibleValue(false);

    const isWellnessSelected =
      selectedCategories.filter((category) => category["key"] === "W").length >
      0;
    const isImplementationSelected =
      selectedCategories.filter((category) => category["key"] === "I").length >
      0;
    const userQuery = `What is the ${
      isWellnessSelected ? "my wellness " : ""
    } ${
      isImplementationSelected ? `and my implementation` : ""
    }paid, certified and remaining amount`;
    props.actionProvider.handleFlow2Query(userQuery, props.state, {
      customerName: customerName,
      policyDate: date,
      isWellnessSelected: isWellnessSelected,
      isImplementationSelected: isImplementationSelected,
    });
  };

  return isVisible ? (
    <form onSubmit={handleSubmit}>
      <div className="card flex justify-content-center ">
        <InputText
          id="customerName"
          value={customerName}
          onChange={(e) => setCustomerNameValue(e.target.value)}
          className="p-inputtext-sm"
          placeholder="Plan Sponsor"
        />
        <InputText
          id="DateOrYear"
          value={date}
          onChange={(e) => setDateValue(e.target.value)}
          className="p-inputtext-sm"
          placeholder="Policy Year"
        />
       
      </div>
      <div className="checkboxContainer flex flex-wrap justify-content-center gap-3">
          {categories.map((category) => {
            return (
              <div
                key={category.key}
                className="checkBox flex align-items-center"
              >
                <Checkbox
                  inputId={category.key}
                  name="category"
                  value={category}
                  onChange={onCategoryChange}
                  checked={selectedCategories.some(
                    (item) => item.key === category.key
                  )}
                />
                <label htmlFor={category.key} className="ml-2">
                  {category.name}
                </label>
              </div>
            );
          })}
        </div>
      <div className="card flex justify-content-center">
        <Button
          label="Submit"
          rounded
          text
          raised
          size="small"
          disabled={
            customerName === "" ||
            date === "" ||
            selectedCategories.length === 0
          }
        />
      </div>
    </form>
  ) : null;
}
