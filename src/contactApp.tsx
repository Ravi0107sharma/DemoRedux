/* tslint:disable:no-unused-variable */
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { DetailsList, DetailsListLayoutMode, IColumn, Selection, SelectionMode } from 'office-ui-fabric-react/lib/DetailsList';
/* tslint:enable:no-unused-variable */
import { TextField } from 'office-ui-fabric-react/lib/TextField';
// import { Toggle } from 'office-ui-fabric-react/lib/Toggle';
// import DetailsListBasicExample from './contactApp';
import TextFieldPlaceholderExample from './contactForm';
// import { CommandButton } from 'office-ui-fabric-react/lib/Button';
import { initializeIcons } from '@uifabric/icons';
import { MarqueeSelection } from 'office-ui-fabric-react/lib/MarqueeSelection';
import { lorem } from '@uifabric/example-app-base';
// import { Link } from 'office-ui-fabric-react/lib/Link';
import { Link } from "react-router-dom";
import 'office-ui-fabric-react/lib/components/TextField/examples/TextField.Examples.scss.js';
// import { Redirect } from "react-router-dom";
import { store } from './Container/Contact_container';
// import { CommandBarButton } from 'office-ui-fabric-react/lib/Button';
// import './DetailsListExample.scss';

let _items: IDocument[] = [];

const fileIcons: { name: string; }[] = [
    { 'name': 'accdb' },
    { 'name': 'csv' },
    { 'name': 'docx' },
    { 'name': 'dotx' },
    { 'name': 'mpp' },
    { 'name': 'mpt' },
    { 'name': 'odp' },
    { 'name': 'ods' },
    { 'name': 'odt' },
    { 'name': 'one' },
    { 'name': 'onepkg' },
    { 'name': 'onetoc' },
    { 'name': 'potx' },
    { 'name': 'ppsx' },
    { 'name': 'pptx' },
    { 'name': 'pub' },
    { 'name': 'vsdx' },
    { 'name': 'vssx' },
    { 'name': 'vstx' },
    { 'name': 'xls' },
    { 'name': 'xlsx' },
    { 'name': 'xltx' },
    { 'name': 'xsn' }
];

export interface IDetailsListDocumentsExampleState {
    columns: IColumn[];
    items: IDocument[];
    selectionDetails: string;
    isModalSelection: boolean;
    isCompactMode: boolean;
    gdata: {};
}

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

export class GridControl extends React.Component<{}, IDetailsListDocumentsExampleState> {
    private _selection: Selection;

    constructor(props: {}) {
        super(props);
        initializeIcons();
        //  Populate with items for demos.
        if (_items.length === 0) {
            for (let i = 0; i < 20; i++) {
                const randomFileType = this._randomFileIcon();
                let fileName: string = lorem(2).replace(/\W/g, '');
                let userName: string = lorem(2).replace(/[^a-zA-Z ]/g, '');
                fileName = fileName.charAt(0).toUpperCase() + fileName.slice(1).concat(`.${randomFileType.docType}`);
                userName = userName.split(' ')
                    .map((name: string) => name.charAt(0).toUpperCase() + name.slice(1)).join(' ');
                _items.push({
                    fullname: 'Harish Chandra',
                    emailaddress1: 'email@email.com',
                    company: 'HCL',
                    telephone1: '7838659450',
                    telephone2: '7838659450',
                    firstname: 'Harish',
                    lastname: 'Chandra',
                    address1_name: 'Noida',
                    contactid: fileName,
                    _parentcustomerid_value: ''
                });
            }
            _items = this._sortItems(_items, 'fullname');
        }

        const _columns: IColumn[] = [
            {
                key: 'column1',
                name: 'contactid',
                headerClassName: 'DetailsListExample-header--FileIcon',
                className: 'DetailsListExample-cell--FileIcon',
                iconClassName: 'DetailsListExample-Header-FileTypeIcon',
                iconName: 'Page',
                isIconOnly: true,
                fieldName: 'contactid',
                minWidth: 100,
                maxWidth: 150,
                onRender: (item: IDocument) => {
                    return (
                        <span>
                            {item.contactid}
                        </span>
                    );
                },
                isPadded: true
            },
            {
                key: 'column2',
                name: 'Full Name',
                fieldName: 'fullname',
                minWidth: 210,
                maxWidth: 350,
                isRowHeader: true,
                isResizable: true,
                isSorted: true,
                isSortedDescending: false,
                onColumnClick: this._onColumnClick,
                data: 'string',
                isPadded: true,
                onRender: (item: IDocument) => {
                    return (
                        // <Link key={item.fullname} onClick={this.SetContactId(item.contactid)}>
                        //     {item.fullname}
                        // </Link>
                        <Link  to="/ContactEditForm" key={item.contactid}  onClick={this.SetContactId(item.contactid)}>{item.fullname}</Link>
                        //<CommandBarButton onClick={this.setId} text={item.fullname} />
                    );
                }
            },
            {
                key: 'column3',
                name: 'Email',
                fieldName: 'emailaddress1',
                minWidth: 70,
                maxWidth: 90,
                isResizable: true,
                onColumnClick: this._onColumnClick,
                data: 'string',
                // onRender: (item: IDocument) => {
                //    return (
                //        <span>
                //            {item.emailaddress1}
                //        </span>
                //    );
                // },
                isPadded: true
            },
            {
                key: 'column4',
                name: 'Company Name',
                fieldName: '_parentcustomerid_value',
                minWidth: 70,
                maxWidth: 90,
                isResizable: true,
                isCollapsable: true,
                data: 'string',
                onColumnClick: this._onColumnClick,
                // onRender: (item: IDocument) => {
                //    return (
                //        <span>
                //            {item.company}
                //        </span>
                //    );
                // },
                isPadded: true
            },
            {
                key: 'column5',
                name: 'Business Phone',
                fieldName: 'telephone1',
                minWidth: 70,
                maxWidth: 90,
                isResizable: true,
                isCollapsable: true,
                data: 'number',
                onColumnClick: this._onColumnClick,
                // onRender: (item: IDocument) => {
                //     return (
                //         <span>
                //             {item.telephone1}
                //         </span>
                //     );
                // }
            },
        ];

        this._selection = new Selection({
            onSelectionChanged: () => {
                this.setState({
                    gdata: true,
                    selectionDetails: this._getSelectionDetails(),
                    isModalSelection: this._selection.isModal()
                });
            }
        });

        this.state = {
            items: _items,
            columns: _columns,
            selectionDetails: this._getSelectionDetails(),
            isModalSelection: this._selection.isModal(),
            isCompactMode: false,
            gdata: false
        };
    }
    componentDidMount() {
        const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Im90cUdaV2xTWDFUdkdpOFI0dUthanBCSUc5ayIsImtpZCI6Im90cUdaV2xTWDFUdkdpOFI0dUthanBCSUc5ayJ9.eyJhdWQiOiJodHRwczovL3RpMXBsYWlub3JnNTNzZzQyNS5jcm0yLmNybWxpdmV0aWUuY29tIiwiaXNzIjoiaHR0cHM6Ly9zdHMud2luZG93cy1wcGUubmV0LzQ5ZDg5MWRjLWQ2YTYtNDdiMy1iMWY4LTViNjE5MWVlY2U0Yi8iLCJpYXQiOjE1MjQ3Mzc4MjgsIm5iZiI6MTUyNDczNzgyOCwiZXhwIjoxNTI0NzQxNzI4LCJhY3IiOiIxIiwiYWlvIjoiNDJKZ1lORDhmazkwNHZuNnZmMk11bytpbEgwWHZtVjh1alZlZWNNVzgrVldDbTk2ZW5nQSIsImFtciI6WyJwd2QiXSwiYXBwaWQiOiJjZTlmOWYxOC1kZDBjLTQ3M2UtYjliMi00NzgxMjQzNWUyMGQiLCJhcHBpZGFjciI6IjAiLCJmYW1pbHlfbmFtZSI6Ikxhc3QiLCJnaXZlbl9uYW1lIjoiRmlyc3QiLCJpcGFkZHIiOiIxMDQuNDQuMTEyLjE5NSIsIm5hbWUiOiJGaXJzdCBMYXN0Iiwib2lkIjoiMjJlY2QwMWMtMTA0Yi00YmFiLWE5ZjItYzcyNmQ4MDRkN2I5IiwicHVpZCI6IjEwMDM3RkZFQUEyREM3OUMiLCJzY3AiOiJ1c2VyX2ltcGVyc29uYXRpb24iLCJzdWIiOiJsQ3RNX280QVRQOEEtV1pDNkU2cWhfYThPYmp3c01qd1ZpMnlVYWRLUTZvIiwidGlkIjoiNDlkODkxZGMtZDZhNi00N2IzLWIxZjgtNWI2MTkxZWVjZTRiIiwidW5pcXVlX25hbWUiOiJjcm1hZG1pbkBTRzQyNVRlbmFudDUzLmNjc2N0cC5uZXQiLCJ1cG4iOiJjcm1hZG1pbkBTRzQyNVRlbmFudDUzLmNjc2N0cC5uZXQiLCJ1dGkiOiJxM3d5cWxNM1JVR1NqMGFWXzZVSUFBIiwidmVyIjoiMS4wIiwid2lkcyI6WyI2MmU5MDM5NC02OWY1LTQyMzctOTE5MC0wMTIxNzcxNDVlMTAiXX0.OqFb9s89ICg3570ub_DNzCQ0z2pxjX5lwDluCMPw9rFOWUxelH8ncf515bPSJNVJXOg1v_JxDX0BCaOaVYhECyYfHWLuboFuoUXsemIZA4DacoF6kOzwnFkS-OJOWXr2BYacGf8VVzghkAegunrb4ayL3I8bSl-65_K_RdBnjJrmo47-nevd1JzCKaFp1BDXKCxgdgGbcS8LUaLG9w7NyfrbzEKdflqLjCmwmvPE5qPDN257NQqajvdbFue4J35shr2P897-wtIBFKRnpcoL4wHF34VGy7rO1k_NWFhKbPo1mvDiJjaKGhFvV_k7Qf1SW_7PwWGDwvtkdd1Kh0JDdQ";
        fetch('https://ti1plainorg53sg425.crm2.crmlivetie.com/api/data/v9.0/contacts?$select=fullname,emailaddress1,company,telephone1,telephone2,firstname,lastname,address1_name,contactid,_parentcustomerid_value',
            {
                // body: JSON.stringify(data), // must match 'Content-Type' header
                // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                // credentials: 'same-origin', // include, same-origin, *omit
                headers: {
                    // 'user-agent': 'Mozilla/4.0 MDN Example',
                    'content-type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                method: 'get', // *GET, POST, PUT, DELETE, etc.
                // mode: 'cors', // no-cors, cors, *same-origin
                // redirect: 'follow', // manual, *follow, error
                // referrer: 'no-referrer', // *client, no-referrer
            })
            .then(results => {
                return results.json();
            }).then(data => {
                this.setState({
                    items: data.value
                });
                _items = data.value;
            });
    }

    public render() {
        const { columns, isCompactMode, items } = this.state;

        return (
            <div>
                <TextField label="Filter by name:" onChanged={this._onChangeText} />
                <MarqueeSelection selection={this._selection}>
                    <DetailsList
                        items={items}
                        compact={isCompactMode}
                        columns={columns}
                        selectionMode={this.state.isModalSelection ? SelectionMode.multiple : SelectionMode.none}
                        setKey="set"
                        layoutMode={DetailsListLayoutMode.justified}
                        isHeaderVisible={true}
                        selection={this._selection}
                        selectionPreservedOnEmptyClick={true}
                       //  onItemInvoked={this._onItemInvoked}
                        enterModalSelectionOnTouch={true}
                    />
                </MarqueeSelection>
                {/* <UserList /> */}
                {/* <div>Gdata :{this.state.gdata?"true":"false"}</div> */}
            </div>
        );
    }
    
    public SetContactId = (contactid: string): () => void => {
        return (): void => {
            alert("Main Form ->"  + contactid);
            store.dispatch({ type: "Contact", text: contactid });
        };
    }
    public openEditForm = (contactid: string, firstname: string, lastname: string, emailaddress1: string, telephone1: string): () => void => {
        return (): void => {
            ReactDOM.render(<TextFieldPlaceholderExample contactid={contactid} firstName={firstname} lastName={lastname} email={emailaddress1} phone={telephone1} />, document.getElementById('root'));
        };
    }
    public componentDidUpdate(previousProps: {}, previousState: IDetailsListDocumentsExampleState) {
        if (previousState.isModalSelection !== this.state.isModalSelection) {
            this._selection.setModal(this.state.isModalSelection);
        }
    }

    // private _onChangeCompactMode = (checked: boolean): void => {
    //     this.setState({ isCompactMode: checked });
    // }

    // private _onChangeModalSelection = (checked: boolean): void => {
    //     this.setState({ isModalSelection: checked });
    // }

    private _onChangeText = (text: string): void => {
        this.setState({
            items: text ? _items.filter(i => i.fullname.toLowerCase().
                indexOf(text.toLowerCase()) > -1) : _items
        });
    }

    // private _onItemInvoked(item: {}): void {
    //     alert(`Item invoked: ${item}`);
    // }

    private _randomFileIcon(): { docType: string; url: string; } {
        const docType: string = fileIcons[Math.floor(Math.random() * fileIcons.length) + 0].name;
        return {
            docType,
            url: `https://static2.sharepointonline.com/files/fabric/assets/brand-icons/document/svg/${docType}_16x1.svg`
        };
    }

    private _getSelectionDetails(): string {
        const selectionCount = this._selection.getSelectedCount();

        switch (selectionCount) {
            case 0:
                return 'No items selected';
            case 1:
                return '1 item selected: ' + (this._selection.getSelection()[0] as string);
            default:
                return `${selectionCount} items selected`;
        }
    }

    private _onColumnClick = (ev: React.MouseEvent<HTMLElement>, column: IColumn): void => {
        // const { columns, items } = this.state;
        const { columns } = this.state;
        // let newItems: IDocument[] = items.slice();
        const newColumns: IColumn[] = columns.slice();
        const currColumn: IColumn = newColumns.filter((currCol: IColumn, idx: number) => {
            return column.key === currCol.key;
        })[0];
        newColumns.forEach((newCol: IColumn) => {
            if (newCol === currColumn) {
                currColumn.isSortedDescending = !currColumn.isSortedDescending;
                currColumn.isSorted = true;
            } else {
                newCol.isSorted = false;
                newCol.isSortedDescending = true;
            }
        });
        this._MySortItems(currColumn.fieldName, newColumns, currColumn.isSortedDescending);
        // newItems = this._sortItems(newItems, currColumn.fieldName, currColumn.isSortedDescending);
        // this.setState({
        //     columns: newColumns,
        //     items: newItems
        // });
    }

    private _sortItems = (items: IDocument[], sortBy: string, descending = false): IDocument[] => {
        if (descending) {
            return items.sort((a: IDocument, b: IDocument) => {
                if (a[sortBy] < b[sortBy]) {
                    return 1;
                }
                if (a[sortBy] > b[sortBy]) {
                    return -1;
                }
                return 0;
            });
        } else {
            return items.sort((a: IDocument, b: IDocument) => {
                if (a[sortBy] < b[sortBy]) {
                    return -1;
                }
                if (a[sortBy] > b[sortBy]) {
                    return 1;
                }
                return 0;
            });
        }
    }

    private _MySortItems = (sortBy: string, newColumns: IColumn[], descending = false): void => {
        var order = '';
        if (descending) {
            order = 'asc';
        } else {
            order = 'desc';
        }
        fetch(
            'https://ti1plainorg53sg425.crm2.crmlivetie.com/api/data/v9.0/contacts?$select=fullname,emailaddress1,company,telephone1,telephone2,firstname,lastname,address1_name,contactid,_parentcustomerid_value&$orderby=' + sortBy + ' ' + order)
            .then(results => {
                return results.json();
            }).then(data => {
                this.setState({
                    columns: newColumns,
                    items: data.value
                });
            });
    }
}

export default GridControl;