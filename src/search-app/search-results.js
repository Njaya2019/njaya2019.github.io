import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import {dom} from '@polymer/polymer/lib/legacy/polymer.dom.js';
import '@polymer/iron-ajax/iron-ajax.js';

/**
 * @customElement
 * @polymer
 */
class ResultsApp extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
            display: grid;
            grid-template-columns:1fr;
            grid-template-rows:40px auto;
            grid-row-gap:5px;
            position:relative;
        }
        #title{
            display:grid;
            grid-template-columns:1fr 2fr 2fr 2fr 1fr;
            grid-template-rows:40px;
            font-weight:bold;
        }
        #title div{
            display:flex;
            flex-direction:column;
            justify-content:flex-end;
            align-items:center;
        }
        .data-titles{
            border: 1px solid rgba(0,0,0,0.4);
            font-size:16px;
            color:rgba(0,0,0,0.6);
        }

        #results-body{
            // border: 1px solid rgba(0,0,0,0.4);
            display:grid;
            grid-template-columns:1fr;
            grid-row-gap:3px;
        }
        .value-div-container{
            display:grid;
            grid-template-columns:1fr 2fr 2fr 2fr 1fr;
            grid-template-rows:40px;
            font-weight:bold;
        }
        .value-div{
            border: 1px solid rgba(0,0,0,0.4);
            display:flex;
            flex-direction:column;
            justify-content:center;
            align-items:center;
            font-size:15px;
        }
        #error-container{
          z-index: 4;
          background-color: rgba(255, 0, 0, 1);
          position: absolute;
          top: -20px;
          left: 500px;
          width: -webkit-max-content;
          height: -webkit-max-content;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items:center;
          border-radius: 2px;
          color:white;
          display: none;
          // padding-right:10px;

        }
        #error-container span{
          margin-left:10px;
          padding-right: 5px;
          cursor:pointer;
          color:black;
          font-weight:bold;
          transition:0.7s ease-in-out;
        }
        #error-container span:hover{
          color:white;
        }
      </style>
      <div id="title">
        <div></div>
        <div id="firstname-title-div" class="data-titles">First name</div>
        <div id="lastname-title-div" class="data-titles">Last name</div>
        <div id="gender-title-div" class="data-titles">Gender</div>
        <div id=""></div>
      </div>
      <div id="results-body">
            <iron-ajax
              auto 
              url="http://127.0.0.1:8000/users/people/?firstname={{param}}"
              handle-as="json"
              on-response="handleResponse"
              on-error="handleError" id="xhr">
            </iron-ajax>
            <template is="dom-repeat" items="{{peoplearray}}">
              <div class="value-div-container">
                  <div></div>
                  <div class="value-div">[[item.firstname]]</div>
                  <div class="value-div">[[item.lastname]]</div>
                  <div class="value-div">[[item.gender]]</div>
                  <div></div>
              </div>
            </template>
      </div>
      <div id="error-container">
          <label>Please provide a search value</label><span on-click="handleClick">x</span>
      <div>
    `;
  }

  handleResponse(e){
    this.peoplearray = e.detail.response;
    console.log(this.peoplearray);

  }

  handleError(e){
    this.peoplearray = [];
    this.error = e.detail.request.xhr.response;
    console.log(this.error);
    let iron = dom(e.target);
    // Grabs the error container
    let errorContainer = iron.parentNode.parentNode.children[3];
    // Gets the label element that will hold the error
    let labelElement = errorContainer.children[0];
    // console.log(labelElement);
    // Provides the label element with the error text
    labelElement.innerHTML = this.error.error;
    // Displays the error container
    errorContainer.style.display = 'flex';
    // Clears the error container and it's content
    setTimeout(function(){
        // Clears the error message in the label element
        labelElement.innerHTML = '';
        // Makes the error container disappear
          errorContainer.style.display = "none";
    }, 10000);
  }

  handleClick(e){
    // Grabs the error container with the dom native API
    let span = dom(e.target);
    // closes the error container
    span.previousElementSibling.parentNode.style.display = "none";
  }

  static get properties() {
    return {
      peoplearray: {
        type: Array,
        reflectToAttribute: true,
        notify: true
      },
      param: {
        type: String,
        reflectToAttribute: true,
        notify: true
      },
      error: {
        type: Object,
        reflectToAttribute: true,
        notify: true
      },
    };
  }
  
  
}

window.customElements.define('results-app', ResultsApp);