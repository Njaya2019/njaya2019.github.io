import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import {dom} from '@polymer/polymer/lib/legacy/polymer.dom.js';
/**
 * @customElement
 * @polymer
 */
class SearchForm extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
        //   border: 1px solid rgba(0,0,0,0.5);
          margin-left:10px;
          margin-right:10px;
          display:grid;
          grid-template-column:1fr;
          grid-template-rows:60px;
        }
        #search-form{
          display: grid;
          grid-template-columns:1fr 2fr 1fr;
          grid-template-rows:60px;
          grid-column-gap:5px;
          // border: 1px solid rgba(0,0,0,0.5);
          margin:0;
        }
        #label-div{
        //   border: 1px solid rgba(0,0,0,0.5);
          display:flex;
          flex-direction:row;
          justify-content:flex-end;
          align-items:center;
          font-weight:bold;
          font-size:20px;
          color:rgba(0,0,0,0.7);
        }
        #input-text-div{
        //   border: 1px solid rgba(0,0,0,0.5);
            display:grid;
            grid-template-columns:1fr;
            grid-template-rows:40;
        }
        #submit-div{
        //   border: 1px solid rgba(0,0,0,0.5);
          display:flex;
          flex-direction:row;
          justify-content:flex-start;
          align-items:center;
        }
        #input-search{
          padding:12px 5px 12px 5px;
          border-radius:10px;
          border:1px solid rgba(0,0,0,0.5);
          margin-top:5px;
          margin-bottom:5px;
          outline:none;
          font-size:20px;
          font-family:Times New Roman', Times, serif;
          font-weight:normal;
        }
        #input-search:focus{
          box-shadow: 0 0 3pt 2pt rgba(0,0,255,0.8);
        }
        #submit-search{
          padding:15px 35px 15px 35px;
          background-color:rgba(60, 179, 113, 0.8);
          border:1px solid rgba(60, 179, 113, 0.8);
          border-radius:5px;
          cursor:pointer;
          transition: 0.7s ease-in-out;
          font-size:13px;
          font-weight:bold;
        }
        #submit-search:hover{
            color:white;
        }
      </style>
      <form id="search-form" on-submit="handleSubmit">
          <div id="label-div">
             <label for="input-search" id="search-label">Search people by first name</label>
          </div>
          <div id="input-text-div">
              <input type="text" name="firstname" id="input-search"/>
          </div>
          <div id="submit-div">
               <input type="submit" name="submit-search" id="submit-search" value="search"/>
          </div>
      </form>
    `;
  }

  handleSubmit(e){
    e.preventDefault();
    // grabs the form in the dom native API
    let searchForm = dom(e.target);
    this.queryparameterform = searchForm.children[1].children[0].value;
    console.log(this.queryparameterform);

  }

  static get properties() {
    return {
      queryparameterform: {
        type: String,
        reflectToAttribute: true,
        notify: true
      }
    };
  }
}

window.customElements.define('search-form', SearchForm);