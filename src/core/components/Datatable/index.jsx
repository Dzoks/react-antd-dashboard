import React from 'react';
import "./index.css";
import { Table, Input, Select } from 'antd';
import moment from 'moment';
class Datatable extends React.Component {



    constructor(props) {
        super(props);
        this.state = {
            filters: {},
            sorters: {}
        }
    }

    getFilteringProps = (dataIndex, filter, title, options, filterFormat, dateUnitToCompare) => {
        let filterFunction;
        let titleJsx;
        switch (filter) {
            case "string":
                titleJsx = <div className="generic-table-filter-container">
                    <div className="generic-table-filter-title">{title}</div>
                    <Input className="generic-table-filter-input" onChange={e => {
                        const filters = { ...this.state.filters };
                        filters[dataIndex] = e.target.value;
                        this.setState({ filters })
                    }}
                    />
                </div>;
                filterFunction = (value, record) => {
                    if (!value || value === "")
                        return true;
                    if (!record[dataIndex])
                        return false;
                    return record[dataIndex].toLowerCase().includes(value.toLowerCase());
                }
                break;
            case "date":
                titleJsx = <div className="generic-table-filter-container">
                    <div className="generic-table-filter-title">{title}</div>
                    <Input className="generic-table-filter-input" onChange={e => {
                        const filters = { ...this.state.filters };
                        filters[dataIndex] = e.target.value;
                        this.setState({ filters })
                    }}
                    />
                </div>;
                filterFunction = (value, record) => {
                    if (!value || value === "")
                        return true;
                    if (!value || value === "")
                        return true;
                    if (!record[dataIndex])
                        return false;
                    let date = moment(value, filterFormat, true);
                    if (date.isValid())
                        return date.isSame(moment(record[dataIndex]), dateUnitToCompare);
                    let operator = value.slice(0, 1);
                    date = moment(value.slice(1), filterFormat, true);
                    if (date.isValid()) {
                        if (operator === "<")
                            return moment(record[dataIndex]).isBefore(date, dateUnitToCompare);
                        else if (operator === ">")
                            return moment(record[dataIndex]).isAfter(date, dateUnitToCompare);
                        else if (operator === "=")
                            return date.isSame(moment(record[dataIndex]), dateUnitToCompare);
                        else return false;
                    }
                    operator = value.slice(0, 2);
                    date = moment(value.slice(2), filterFormat, true);
                    if (date.isValid()) {
                        if (operator === "<=")
                            return moment(record[dataIndex]).isSameOrBefore(date, dateUnitToCompare);
                        else if (operator === ">=")
                            return moment(record[dataIndex]).isSameOrAfter(date, dateUnitToCompare);
                    }
                    return false;
                };
                break;
            case "number":
                titleJsx = <div className="generic-table-filter-container">
                    <div className="generic-table-filter-title">{title}</div>
                    <Input className="generic-table-filter-input" onChange={e => {
                        const filters = { ...this.state.filters };
                        filters[dataIndex] = e.target.value;
                        this.setState({ filters })
                    }}
                    />
                </div>;
                filterFunction = (value, record) => {
                    if (!value || value === "")
                        return true;
                    let number = Number.parseFloat(value);
                    if (!isNaN(number))
                        return number === Number.parseFloat(record[dataIndex]);
                    let operator = value.slice(0, 1);
                    number = Number.parseFloat(value.slice(1));
                    if (!isNaN(number)) {
                        if (operator === "<")
                            return Number.parseFloat(record[dataIndex]) < number;
                        else if (operator === ">")
                            return Number.parseFloat(record[dataIndex]) > number;
                        else if (operator === "=")
                            return number === Number.parseFloat(record[dataIndex]);
                        else return false;
                    }
                    operator = value.slice(0, 2);
                    number = Number.parseFloat(value.slice(2));
                    if (!isNaN(number)) {
                        if (operator === "<=")
                            return Number.parseFloat(record[dataIndex]) <= number;
                        else if (operator === ">=")
                            return Number.parseFloat(record[dataIndex]) >= number;
                    }
                    return false;
                };
                break;
            case "select":
                titleJsx = <div className="generic-table-filter-container">
                    <div className="generic-table-filter-title">{title}</div>
                    <Select className="generic-table-filter-select" showArrow={false} onChange={value => {
                        const filters = { ...this.state.filters };
                        filters[dataIndex] = value;
                        this.setState({ filters })
                    }}
                    >{[{ id: "", value: "" }, ...options].map(o => <Select.Option key={o.id} value={o.id}>{o.value}</Select.Option>)}</Select>
                </div>;
                filterFunction = (value, record) => {
                    if (!value || value === "")
                        return true;
                    return record[dataIndex] == value;
                }
                break;
            case "multiSelect":
                titleJsx = <div className="generic-table-filter-container">
                    <div className="generic-table-filter-title">{title}</div>
                    <Select className="generic-table-filter-multiselect" mode="multiple" onChange={value => {
                        const filters = { ...this.state.filters };
                        filters[dataIndex] = value;
                        this.setState({ filters })
                    }}
                    >{options.map(o => <Select.Option key={o.id} value={o.id}>{o.value}</Select.Option>)}</Select>
                </div>;
                filterFunction = (value, record) => {
                    if (!value || value.length === 0)
                        return true;
                    return value.includes(record[dataIndex])
                }
                break;
            default:
                filterFunction = (value, record) => (value, record) => {
                    if (!value || value === "")
                        return true;
                    return record[dataIndex].toLowerCase().includes(value.toLowerCase());
                }
        }
        return {
            title: titleJsx,
            filters: [],
            filteredValue: [this.state.filters[dataIndex] || ""],
            onFilter: filterFunction
        }
    }


    getSortingProps = (dataIndex, sort) => {
        let sortingFunction;
        switch (sort) {
            case "string":
                sortingFunction = (a, b) => {
                    if (!a[dataIndex])
                        return 1;
                    else if (!b[dataIndex])
                        return -1;
                    return a[dataIndex].localeCompare(b[dataIndex]);
                }
                break;
            case "number":
                sortingFunction = (a, b) => {
                    if (!a[dataIndex] || isNaN(a[dataIndex]))
                        return 1;
                    else if (!b[dataIndex] || isNaN(b[dataIndex]))
                        return -1;
                    return a[dataIndex] - b[dataIndex];
                }
                break;
            case "date":
                sortingFunction = (a, b) => {
                    if (!a[dataIndex])
                        return 1;
                    else if (!b[dataIndex])
                        return -1;
                    const momentA = moment(a[dataIndex]);
                    const momentB = moment(b[dataIndex]);
                    if (momentA > momentB) return 1;
                    else if (momentA < momentB) return -1;
                    else return 0;
                }
                break;
            default:
                sortingFunction = () => 0;
        }
        return {
            sorter: sortingFunction,
            sortOrder: this.state.sorters[dataIndex] || false,
            onHeaderCell: () => {
                return {
                    onClick: ev => {
                        const allowedClasses = ["ant-select-selection-item", "ant-select-selector", "ant-select-item-option-content", "ant-select-selection-search", "generic-table-filter-select"]
                        if (ev.target.localName === "input" || allowedClasses.includes(ev.target.className) || allowedClasses.includes(ev.target.parentNode.className) || allowedClasses.includes(ev.target.parentNode.parentNode.className))
                            return;
                        let nextValue;
                        if (this.state.sorters[dataIndex] === "ascend")
                            nextValue = "descend";
                        else if (this.state.sorters[dataIndex] === "descend")
                            nextValue = false;
                        else nextValue = "ascend";
                        const sorters = {};
                        sorters[dataIndex] = nextValue;
                        this.setState({
                            sorters
                        })
                    }
                }
            }
        }
    }


    generateColumns = columns => columns.map(({ dataIndex, title, sort, filter, filterOptions, options, render, format, filterFormat, dateUnitToCompare, ...rest }) => {
        let config = {
            render
        };
        if (options)
            config.render = (text, record, index) => {
                let value = record[dataIndex];
                const foundItem = options.find(o => o.id == value);
                if (foundItem)
                    value = foundItem.value;
                if (render)
                    return render(value, record, index);
                else return <>{value}</>;
            }
        if (format)
            config.render = (text, record, index) => {
                const value = record[dataIndex] ? moment(record[dataIndex]).format(format) : record[dataIndex];
                if (render)
                    return render(value, record, index);
                else return <>{value}</>;
            }
        return {
            dataIndex,
            title,
            showSorterTooltip: false,
            ...(sort ? this.getSortingProps(dataIndex, sort) : {}),
            ...(filter ? this.getFilteringProps(dataIndex, filter, title, filterOptions, filterFormat, dateUnitToCompare) : {}),
            ...config,
            ...rest
        };
    })
    render() {
        const { dataSource, columns, className, ...rest } = this.props;
        return <Table className={`datatable generic-table ${className}`} dataSource={dataSource} columns={this.generateColumns(columns)} {...rest} />;
    }

}


export default Datatable;