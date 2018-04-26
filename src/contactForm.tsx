import * as React from 'react';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { store } from './Container/Contact_container';

let _IDocus: IDocument = {
    fullname: '',
    emailaddress1: '',
    company: '',
    telephone1: '',
    telephone2: '',
    firstname: '',
    lastname: '',
    address1_name: '',
    contactid: '',
    _parentcustomerid_value: ''
    };
export interface IDocument {
    fullname: string;
    emailaddress1: string;
    company: string;
    telephone1: string;
    telephone2: string;
    firstname: string;
    lastname: string;
    address1_name: string;
    contactid: string;
    _parentcustomerid_value: string;
}
export interface IDetailsListDocumentsExampleState {
    items: IDocument;
    selectionDetails: string;
    isModalSelection: boolean;
    isCompactMode: boolean;
    gdata: {};
}
export class ContactForm extends React.Component<{contactid: string, 
    firstName: string,
    lastName: string,
    email: string,
    phone: string}, IDetailsListDocumentsExampleState> {
    constructor(props: any){
      super(props);
     const contactid = store.getState();
     alert("Contact Form ID" + contactid);
    }
  public render() {
    const { items } = this.state;
    
    return (
      <div className="docs-TextFieldExample">
        <TextField 
          label="First Name"
          value={items.firstname}
        />

        <TextField
          label="Last Name"
          value={items.lastname}
          placeholder="Please enter your middle name here"
          ariaLabel="Last Name"
        />

        <TextField
          label="Business Phone"
          value={items.telephone1}
          placeholder="Please enter your job title"
          ariaLabel="Business Phone"
        />

        <TextField
          label="Email"
          value={items.emailaddress1}
          placeholder="Please enter your email"
          ariaLabel="Email"
        />
      </div>
    );
  }
  componentWillMount() {
    this.setState({
        items: _IDocus
    });
    

    var url = 'https://ti1plainorg53sg425.crm2.crmlivetie.com/api/data/v9.0/contacts(' + this.props.contactid + ')?$select=fullname,emailaddress1,company,telephone1,telephone2,firstname,lastname,address1_name,contactid,_parentcustomerid_value';
    fetch(url)
    .then(results => {
        return results.json();
    }).then(data => {
    this.setState({
            items: data
        });
    });
  }
}
export default ContactForm;