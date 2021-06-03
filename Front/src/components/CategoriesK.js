import React, { useState } from 'react';
import { Label, Form, Input, Select, TextArea, Buttons, Button } from '../styles/index';
import { FiX, FiSend } from 'react-icons/fi';

class Categories extends Component {
    state = {
      categories: [],
      selectedCategory: "",
      validationError: ""
    };
  
    componentDidMount() {
      fetch(
        "http://localhost:3000/categories"
      )
        .then(response => {
          return response.json();
        })
        .then(data => {
          let categoriesFromApi = data.map(category => {
            return { value: category, display: category };
          });
          this.setState({
            categories: [
              {
                value: "",
                display:
                  "(Select your category)"
              }
            ].concat(categoriesFromApi)
          });
        })
        .catch(error => {
          console.log(error);
        });
    }
  
    render() {
      return (
        <div>
          <select
            value={this.state.selectedCategory}
            onChange={e =>
              this.setState({
                selectedCategory: e.target.value,
                validationError:
                  e.target.value === ""
                    ? "You must select your category"
                    : ""
              })
            }
          >
            {this.state.categories.map(category => (
              <option
                key={category.value}
                value={category.value}
              >
                {category.display}
              </option>
            ))}
          </select>
          <div
            style={{
              color: "red",
              marginTop: "5px"
            }}
          >
            {this.state.validationError}
          </div>
        </div>
      );
    }
  }

  export default Categories;