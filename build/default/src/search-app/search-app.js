import { html, PolymerElement } from "../../node_modules/@polymer/polymer/polymer-element.js";
import "./search-form.js";
import "./search-results.js";
/**
 * @customElement
 * @polymer
 */

class SearchApp extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
        }
        #body{
          display: grid;
          grid-template-column: 1fr;
          grid-template-rows: 40px auto 40px;
          grid-row-gap: 5px;
          height: 100vh;
          padding:0px;
        }
        #nav{
          border: 1px solid rgba(60, 179, 113, 0.8);
          background-color: rgba(60, 179, 113, 0.8);
          display:flex;
          flex-direction: row;
          justify-content:center;
          align-items:center;
          font-size:28px;
          font-weight:bold;
          color:rgb(51, 51, 204);
        }
        #footer{
          border: 1px solid rgba(60, 179, 113, 0.8);
          background-color: rgba(60, 179, 113, 0.8);
          display:flex;
          flex-direction: row;
          justify-content:center;
          align-items:center;
          font-size:12px;
          font-weight:bold;
        }
        #body-container{
          display:grid;
          grid-template-column:1fr;
          grid-template-rows:60px auto;
          grid-row-gap:10px;
        }
        #results-section{
          // border: 1px solid rgba(0,0,0,0.4);
          margin-left:10px;
          margin-right:10px;
        }
      </style>
      <div id="body">
          <div id="nav">Search and Results</div>
          <div id="body-container">
              <search-form queryparameterform="{{queryparameterhost}}"></search-form>
              <div id="results-section">
                <results-app param="{{queryparameterhost}}"></results-app>
              </div>
          </div>
          <div id="footer">&#169; Andrew Njaya Odhiambo</div>
      </div>
    `;
  }

  static get properties() {
    return {
      queryparameterhost: {
        type: String,
        reflectToAttribute: true,
        notify: true
      }
    };
  }

}

window.customElements.define('search-app', SearchApp);