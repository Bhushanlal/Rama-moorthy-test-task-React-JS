import React, { Component } from 'react';
import CSVReader from 'react-csv-reader';
import axios from 'axios';


export default class Table extends Component {

    constructor(props) {
        super(props)
        this.state = {
            detail:[]
        }
    }

    componentWillMount(){
        axios.get('https://zeno-it-backend.herokuapp.com/index')
        .then((response) => {
            console.log(response.data,'getapi')
              this.setState({detail:response.data})
        })
    }

 
    getFilesUploaded(e){

    const formData = new FormData();
    
        formData.append('file', e.target.files[0]);
        



        axios({
            method: 'post',
            url: 'https://zeno-it-backend.herokuapp.com/upload_file',
            data: formData,
            config: { headers: {'Content-Type': 'multipart/form-data' }}
            })
            .then((response) => {
            this.setState({detail:response.data})
        //    let arr =  this.state.detail.concat(response.data)
        //    this.setState({detail:arr})
    
         })

    }

   
    render() {
        console.log(this.state,'data')
        return (
            <div className="sec-header" style={{ margin: '20px' }}>
                <div style={{ marginLeft: '200px' }}>
                   <input type="file" onChange={(e)=>this.getFilesUploaded(e)} />
                </div>
                <section style={{marginTop:'50px'}} className="container-fluid homePage-sec page-section">
                    <div className="row">
                        <div className="container">
                            <div className="row">
                                <div className="sec-header">
                                    <h2 className="sectitle">Employee Data</h2>
                                    <table className="table table-bordered ">
                                        <thead className="thead-light">
                                        <tr>
                                            <th className="text-center">firstname</th>
                                            <th className="text-center">Lastname </th>
                                            <th className="text-center">age</th>
                                            <th className="text-center">sex</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.detail.map((data,index)=>{
                                            return(
                                           
                                            <tr key={index} >
                                                <td className="text-capitalize text-center">{data.firstname} </td>
                                                <td className="text-center">{data.lastname} </td>
                                                <td className="text-center">{data.age}</td>
                                                <td className="text-center">{data.sex}</td>
                                            </tr>
                                            )
                                             })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}