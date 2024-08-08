//import {Fab, TextareaAutosize, Paper} from '@material-ui/core'
//import {ArrowBack} from '@material-ui/icons'
import {useState , useEffect} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import './Form.css'
function Form({setAddManually , barcode, barcode2 , setAddItem , itemAdded, setItemAdded }) {

    const [cookie, setCookie , removeCookie] = useCookies(['user'])
    const userId = cookie.userId

    const [title , setTitle] = useState("")
    const [quantity, setQuantity ] = useState(1)


    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        productName: title,
        quantity: 0,
        expireDate: ""
    })



    useEffect(() => {
        
        if(barcode2 !== " "){
            console.log( "manual , 2barcode2:", barcode2)
            
            axios.get('http://localhost:5000/item?id=' + barcode2).then((response) => {
                console.log("the data that we got:" ,response.data)
                setTitle(response.data)
                setFormData({
                    productName: response.data,
                    quantity: quantity,
                    expireDate: ""
                })
            }).catch((error) => {
                setAddManually(false)
                setAddItem(false)
                console.log("we are catching the scan error")
                console.log(error + "hjkasdfhjkadsfhjksdafjkhfadsjkhafdsjkhdafshjkdfas")
                alert("BBBBBBBBBBB - The scanned BarCode does not exists!")
            })

        }else{
            console.log("item scanned")
            barcode2 = barcode.codeResult.code
            console.log( "2barcode2:", barcode2, "1:-----------", barcode.codeResult.code)
            axios.get('http://localhost:5000/item?id=' + barcode2).then((response) => {
                console.log("the data that we got:" ,response.data)
                setTitle(response.data)
                setFormData({
                    productName: response.data,
                    quantity: quantity,
                    expireDate: ""
                })

            }).catch((error) => {
                setAddManually(false)
                setAddItem(false)
                console.log(error + "hjkasdfhjkadsfhjksdafjkhfadsjkhafdsjkhdafshjkdfas")
                alert("?? The scanned BarCode does not exists!")
            })
        }
        
    }, []);



    const handleSubmit = async(e) => {
        console.log("trying to submit!")
        e.preventDefault() //prevent from refreshing
        if (barcode2 !== " ") {
            try {
                console.log("manual")
                const response = await axios.patch('http://localhost:5000/user/addItem', { 
                    id: userId,
                    item:{
                        barcode:barcode2,
                        name:formData.productName,
                        expDate: formData.expireDate,
                    },

                    quantity: quantity
                })
                //for re-rendering purposes
                navigate("/my-list")
    
                // window.location.reload();
            } catch (error) {
                console.log(error)
            }

        }else {
            try {
                console.log("item scanned")
                const response = await axios.patch('http://localhost:5000/user/addItem', { 
                    id: userId,
                    item:{
                        barcode:barcode.codeResult.code,
                        name:formData.productName,
                        expDate: formData.expireDate,
                    },
                    quantity: quantity
                })
                //for re-rendering purposes
                
                setItemAdded(true)
                setAddItem(false)
                navigate("/my-list")
                
                // window.location.reload();
            } catch (error) {
                console.log(error)
            }
        }
        
    }

    const handleChange = (e) => {
        const newData = {...formData}
        newData[e.target.id] = e.target.value
        if(newData.productName === ""){
            newData.productName = title
        }
        setFormData(newData)
        console.log(newData)
    }


    const add = (e) => {
        e.preventDefault();

        const newData = {...formData}
        newData["quantity"] = (parseInt(formData["quantity"]) + 1)
        setFormData(newData)
        setQuantity(parseInt(newData["quantity"]))
        console.log(newData)
        console.log("add!")
    }

    const sub = (e) => {
        e.preventDefault();

        const newData = {...formData}
        if(parseInt(formData["quantity"]) > 1){
            newData["quantity"] = (parseInt(formData["quantity"]) - 1)
        setFormData(newData)
        setQuantity(parseInt(newData["quantity"]))
        console.log(newData)
        console.log("sub!")        
        }
        
    }



    return (
        <div className="form-container">
            <form className="form2" onSubmit={handleSubmit}>

                <div className="product">
                    <div className="form-product-right">
                        <label>
                            שם המוצר
                        </label>
                        <input
                            className='btn' 
                            type="text"
                            id="productName"
                            name="productName"
                            value={title}
                            required={true}
                            style={{width: 250}}
                        />
                    </div>
                </div>


                <div className="quantity" style={{marginTop: 30}}>
                    <div class="container-menu" onClick={sub} style={{ marginLeft: 120}}>
                        <input 
                        id="btn" 
                        type="checkbox" 
                        style={{background:"#FF5349"}}
                        />
                        <label style={{padding: 10}} for="btn">-</label>
                    </div>
                    
                    <label for="quantity" style={{marginLeft: 30}}>{quantity} יחידות</label>

                    <div class="container-menu" onClick={add} style={{margin:"0 100px 0 30px"}}>
                        <input 
                        id="btn" 
                        type="checkbox" 
                        />
                        <label style={{padding: 10, marginLeft: 20}} className="btn-plus" for="btn">+</label>
                    </div>
                </div>

                <div className="expire-date">
                    
                    <input 
                    type="date" 
                    id="expireDate"
                    name="date" 
                    onChange={(e) => handleChange(e)}
                    required={true}

                    max="2030-12-31"
                    data-date-inline-picker={true}
                    />
                    <label style={{marginLeft: 20}}>תאריך תפוגה </label>
                </div>


                <div className="add-btn2">
                    <button className="inside-add-btn">New Item</button>
                </div>


            </form>
        </div>
    );
}

export default Form;
