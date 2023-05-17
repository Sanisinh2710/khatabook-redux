import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

let date = new Date();
let year = date.getFullYear();
const months = [`Jan ${year}`, `Feb ${year}`, `Mar ${year}`, `Apr ${year}`, `May ${year}`, `Jun ${year}`, `Jul ${year}`, `Aug ${year}`, `Sep ${year}`, `Oct ${year}`, `Nov ${year}`, `Dec ${year}`]

const Table = (props) => {

    const records = props.records;
    const [data, setData] = useState(records)
    const [sortedField, setSortedField] = useState({});

    useEffect(() => {
        if (sortedField.direction === "normal") {

            setData(records)

        } else if (sortedField.key === "amount") {
            let datanew = [...data]

            if (sortedField.direction === 'ascending') {
                datanew.sort((a, b) => {

                    return (a[sortedField.key] - b[sortedField.key])

                })
            } else if (sortedField.direction === 'descending') {
                datanew.sort((a, b) => {

                    return (b[sortedField.key] - a[sortedField.key])

                })
            }
            setData(datanew)
        } else if (sortedField.key === "tdate") {
            let datanew = [...data]

            if (sortedField.direction === 'ascending') {
                datanew.sort((a, b) => {

                    return new Date(a[sortedField.key]) - new Date(b[sortedField.key])

                })
            } else if (sortedField.direction === 'descending') {
                datanew.sort((a, b) => {

                    return new Date(b[sortedField.key]) - new Date(a[sortedField.key])

                })
            }
            setData(datanew)
        } else if (sortedField.key === "monthYear") {
            let datanew = [...data]

            if (sortedField.direction === 'ascending') {
                console.log(months.indexOf('Jan 2023'));
                datanew.sort((a, b) => {

                    return months.indexOf(a[sortedField.key]) - months.indexOf(b[sortedField.key])
                })
            } else if (sortedField.direction === 'descending') {
                datanew.sort((a, b) => {

                    return months.indexOf(b[sortedField.key]) - months.indexOf(a[sortedField.key])
                })
            }
            setData(datanew)
        }
        else {
            let datanew = [...data]
            datanew.sort((a, b) => {
                if (a[sortedField.key] < b[sortedField.key]) {

                    return sortedField.direction === 'ascending' ? -1 : 1;
                }

                if (a[sortedField.key] > b[sortedField.key]) {
                    return sortedField.direction === 'ascending' ? 1 : -1;
                }
                return 0
            });
            setData(datanew)

        }
        //eslint-disable-next-line
    }, [sortedField])

    const sort = key => {

        setCurrentPage(1)
        let direction = 'ascending';

        if (sortedField.key === key && sortedField.direction === 'ascending') {
            direction = 'descending';

        }
        else if (sortedField.key === key && sortedField.direction === 'descending') {
            direction = "normal";
        }
        setSortedField({ key, direction });
    }

    const [currentPage, setCurrentPage] = useState(1);
    let recordsPerPage = 2;
    let lastIndex = currentPage * recordsPerPage;
    let firstIndex = lastIndex - recordsPerPage;
    let records1 = data.slice(firstIndex, lastIndex);
    const totalPages = Math.ceil(data.length / recordsPerPage)
    const numbers = [...Array(totalPages + 1).keys()].slice(1);



    function prePage() {

        if (currentPage !== 1) {
            setCurrentPage(currentPage - 1)

        }
    }

    function changeCurrentPage(id) {

        setCurrentPage(id)


    }
    function NextPage() {

        if (currentPage !== lastIndex) {
            setCurrentPage(currentPage + 1)

        }
    }

    const search = (e) => {

        
        if (e.target.value === "") {
            
            setData(records)
        } else {
           
            
            
            let temp1 = records.filter((i) => i.tdate.toLowerCase().includes(e.target.value.toLowerCase()) ||
                i.ttype.toLowerCase().includes(e.target.value.toLowerCase()) || i.monthYear.toLowerCase().includes(e.target.value.toLowerCase()) ||
                i.amount.toString().toLowerCase().includes(e.target.value.toString().toLowerCase())|| i.fromAccount.toLowerCase().includes(e.target.value.toLowerCase()) ||
                i.toAccount.toLowerCase().includes(e.target.value.toLowerCase()) || i.remarks.toLowerCase().includes(e.target.value.toLowerCase())
                )
                setData(temp1)
        }
    }   


    return <>
        <div className="search">
            <input type="text" placeholder="Search.." name="search" onInput={search} />
        </div>
        {
            records1.length > 0?<>
            <table>
            <thead>
                <tr>
                    <th onClick={() => sort('tdate')}>Transection-date</th>
                    <th onClick={() => sort('ttype')}>Transection-Type</th>
                    <th onClick={() => sort('monthYear')}>Month-Year</th>
                    <th onClick={() => sort('amount')}>Amount</th>
                    <th onClick={() => sort('fromAccount')}>From-Account</th>
                    <th onClick={() => sort('toAccount')}>To-Account</th>
                    <th onClick={() => sort('remarks')}>Remarks</th>
                    <th>Receipt</th>
                    <th colSpan={2}>Action</th>
                </tr>
            </thead>
            {
                records1.map((data, index) =>
                    <tbody key={index}>
                        <tr >
                            <td>{data.tdate}</td>
                            <td>{data.ttype}</td>
                            <td>{data.monthYear}</td>
                            <td>{Intl.NumberFormat("en-US", {
                                style: "currency",
                                currency: "INR",
                            }).format(data.amount)}</td>
                            <td>{data.fromAccount}</td>
                            <td>{data.toAccount}</td>
                            <td>{data.remarks}</td>
                            <td><img src={data.receipt} width={50} height={50} alt="" /></td>
                            <td><Link to={`/transection/${data.id}`}>Edit</Link></td>
                            <td><Link to={`/view-data/${data.id}`}>View</Link></td>
                        </tr>
                    </tbody>
                )
            }
        </table>
        <nav>

            <ul className="pagination">
                <li className="">
                    <span
                        className={`page-link ${currentPage === 1 ? "disable" : ""}`}
                        onClick={prePage}
                        style={{ cursor: "pointer" }}
                    >
                        Prev
                    </span>
                </li>
                {numbers.map((n, index) => (
                    <li
                        className={`page-item ${currentPage === n ? "active" : ""}`}
                        key={index}
                    >
                        <span
                            className="page-link"
                            onClick={() => changeCurrentPage(n)}
                            style={{ cursor: "pointer" }}
                        >
                            {n}
                        </span>
                    </li>
                ))}
                <li className="page-item">
                    <span
                        className={`page-link ${currentPage === totalPages ? "disable" : ""}`}
                        onClick={NextPage}
                        style={{ cursor: "pointer" }}
                    >
                        Next
                    </span>
                </li>
            </ul>
        </nav>
            
            </>:<><h1>No data Found</h1></>
        }
       
        

    </>
}

export default Table;