import React from 'react';
import "./index.css";
import { Table, Input, Select } from 'antd';
class Datatable extends React.Component{



    constructor(props){
        super(props);
        this.state={
            filters:{},
            sorters:{}
        }
    }

    getFilteringProps=(dataIndex,filter,title,options)=>{
        let filterFunction;
        let titleJsx;
        switch (filter){
            case "string":
                titleJsx=<div className="generic-table-filter-container">
                            <div className="generic-table-filter-title">{title}</div>
                            <Input className="generic-table-filter-input" onChange={e=>{
                                    const filters={...this.state.filters};
                                    filters[dataIndex]=e.target.value;
                                    this.setState({filters})}}
                            />
                        </div>;
                filterFunction=(value, record) => {
                    if (!value||value==="")
                        return true;
                    return record[dataIndex].toLowerCase().includes(value.toLowerCase());
                }
                break;
            case "number":
                titleJsx=<div className="generic-table-filter-container">
                            <div className="generic-table-filter-title">{title}</div>
                            <Input className="generic-table-filter-input" onChange={e=>{
                                    const filters={...this.state.filters};
                                    filters[dataIndex]=e.target.value;
                                    this.setState({filters})}}
                            />
                        </div>;
                filterFunction=(value, record)=>{
                    if (!value||value==="")
                        return true;
                    let number=Number.parseFloat(value);
                    if (!isNaN(number))
                        return number===Number.parseFloat(record[dataIndex]);
                    let operator=value.slice(0,1);
                    number=Number.parseFloat(value.slice(1));
                    if (!isNaN(number)){
                        if (operator==="<")
                        return Number.parseFloat(record[dataIndex])<number;
                        else if (operator===">")
                        return Number.parseFloat(record[dataIndex])>number;
                        else if (operator==="=")
                        return number===Number.parseFloat(record[dataIndex]);
                        else return false;
                    }
                    operator=value.slice(0,2);
                    number=Number.parseFloat(value.slice(2));
                    if (!isNaN(number)){
                        if (operator==="<=")
                        return Number.parseFloat(record[dataIndex])<=number;
                        else if (operator===">=")
                        return Number.parseFloat(record[dataIndex])>=number;
                    }
                    return false;
                };
                break;
                case "select":
                    titleJsx=<div className="generic-table-filter-container">
                                <div className="generic-table-filter-title">{title}</div>
                                <Select className="generic-table-filter-select" showArrow={false} onChange={value=>{
                                        const filters={...this.state.filters};
                                        filters[dataIndex]=value;
                                        this.setState({filters})}}
                                >{[{id:"",value:""},...options].map(o=><Select.Option key={o.id} value={o.id}>{o.value}</Select.Option>)}</Select>
                            </div>;
                    filterFunction=(value, record) => {
                        if (!value||value==="")
                            return true;
                        return record[dataIndex]==value;
                    }
                    break;
                    case "multiSelect":
                        titleJsx=<div className="generic-table-filter-container">
                                    <div className="generic-table-filter-title">{title}</div>
                                    <Select className="generic-table-filter-multiselect" mode="multiple" onChange={value=>{
                                            const filters={...this.state.filters};
                                            filters[dataIndex]=value;
                                            this.setState({filters})}}
                                    >{options.map(o=><Select.Option key={o.id} value={o.id}>{o.value}</Select.Option>)}</Select>
                                </div>;
                        filterFunction=(value, record) => {
                            if (!value||value.length===0)
                                return true;
                            return value.includes(record[dataIndex])
                        }
                        break;
            default:
                filterFunction=(value, record) => (value, record) => {
                    if (!value||value==="")
                        return true;
                    return record[dataIndex].toLowerCase().includes(value.toLowerCase());
                }
        }
        return {
            title:titleJsx,
            filters: [],
            filteredValue:[this.state.filters[dataIndex]||""],
            onFilter:filterFunction
        }
    }


    getSortingProps=(dataIndex,sort)=>{
        let sortingFunction;
        switch (sort){
            case "string":
                sortingFunction=(a,b)=>a[dataIndex].localeCompare(b[dataIndex]);
                break;
            case "number":
                sortingFunction=(a,b)=>a[dataIndex]-b[dataIndex];
                break;
            default:
                sortingFunction=()=>0;
        }
        return {
            sorter:sortingFunction,
            sortOrder:this.state.sorters[dataIndex]||false,
            onHeaderCell:()=>{
                return {
                    onClick:ev=>{
                        const allowedClasses=["ant-select-selection-item","ant-select-selector","ant-select-item-option-content","ant-select-selection-search","generic-table-filter-select"]
                        if (ev.target.localName==="input" || allowedClasses.includes(ev.target.className)||allowedClasses.includes(ev.target.parentNode.className)||allowedClasses.includes(ev.target.parentNode.parentNode.className))
                          return;
                        let nextValue;
                        if (this.state.sorters[dataIndex]==="ascend")
                            nextValue="descend";
                        else if (this.state.sorters[dataIndex]==="descend")
                            nextValue=false;
                        else nextValue="ascend";
                        const sorters={};
                        sorters[dataIndex]=nextValue;
                        this.setState({
                            sorters
                        })
                    }
                }
            }
        }
    }


    generateColumns=columns=>columns.map(({dataIndex,title,sort,filter,filterOptions,options,render,...rest})=>{
        let optionsConfig={
            render
        };
        if (options)
            optionsConfig.render=(text,record,index)=>{
                let value=record[dataIndex];
                const foundItem=options.find(o=>o.id==value);
                if (foundItem)
                    value=foundItem.value;
                if (render)
                    return render(value,record,index);
                    else return <>{value}</>;
            }
        return {
            dataIndex,
            title,
            ...(sort?this.getSortingProps(dataIndex,sort):{}),
            ...(filter?this.getFilteringProps(dataIndex,filter,title,filterOptions):{}),
            ...optionsConfig,
            ...rest
        };
    })
    render(){
        const {dataSource,columns,className,...rest}=this.props;
        return <Table className={`datatable generic-table ${className}`} dataSource={dataSource} columns={this.generateColumns(columns)} {...rest} />;
    }

}


export default Datatable;