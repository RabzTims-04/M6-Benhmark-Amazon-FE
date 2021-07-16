import React, { Component, createRef } from 'react';
import { Container, Form, Button } from 'react-bootstrap'

const {REACT_APP_BACKEND_URL} = process.env
class AddProduct extends Component {

    ref = createRef()

    state={
        categories:[],
        categoryId:'',
        product:{
            "name": "",
            "description": "",
            "brand": "",
            "imageUrl": "http://avatar.com",
            "categoryId": "",
            "price":'',
        }
    }

    url = `${REACT_APP_BACKEND_URL}/products`
    categoryUrl = `${REACT_APP_BACKEND_URL}/categories`

    componentDidMount = () => {
        this.fetchCategories()
    }

    fetchCategories = async() => {
        try {
            const response = await fetch (this.categoryUrl)
            const data = await response.json()
            if(response.ok){
                this.setState({
                    ...this.state,
                    categories:data
                })
            }
        } catch (error) {
            console.log(error);
        }
    }

    postProduct = async (e)=>{
        e.preventDefault()
        let formData = new FormData()
        formData.append('cover', this.state.product.image)
       try {
        const categoryId = this.state.categories.find(category => category.name.includes(this.state.product.categoryId.split(' ')[0])).id
           const response = await fetch(this.url,{
               method:'POST',
               body:JSON.stringify({
                name:this.state.product.name,
                description: this.state.product.description,
                brand: this.state.product.brand,
                imageUrl: this.state.product.imageUrl,
                categoryId:categoryId,
                price: this.state.product.price
               }),
               headers:{
                   'content-type':'application/json'
               }
           })
           const data = await response.json()
           const productId = await data.id
           if(response.ok){
               if(this.state.product.image){
                   try {
                       const postImg = await fetch(`${this.url}/${productId}/upload`,{
                           method:'POST',
                           body: formData
                       })
                       console.log(await postImg.json());
                       if(postImg.ok){
                           const imgData = await postImg.json()
                           console.log(imgData);
                       }
                       
                   } catch (error) {
                       console.log(error);
                   }
               }
               alert('details posted successfully')
               this.setState({
                product:{
                    "name": "",
                    "description": "",
                    "brand": "",
                    "imageUrl": "",
                    "categoryId": "",
                    "price":""
                }
               })
           }
       } catch (error) {
           console.log(error);
       } 
    }


    render() {

        return (
            /* POST product details */
            <Container className="mt-5">
                <Form onSubmit={(e)=> this.postProduct(e)}>
                    <Form.Group >
                        <Form.Label>Name of Product</Form.Label>
                        <Form.Control 
                        id="name"
                        type="text"
                        value={this.state.product.name}
                        onChange={(e)=> this.setState({
                            product:{
                                ...this.state.product,
                                name:e.target.value
                            }
                        })} 
                        placeholder="Name" />
                    </Form.Group>

                    <label className="p-0 d-flex mb-2" for="image">                                     
                        <input 
                        onClick={(e)=> {e.stopPropagation()
                                return true}}  
                        hidden
                        type="file"
                        id="image"
                        ref={this.ref}
                        onChange={(e) => {this.setState({
                            product:{
                                    ...this.state.product, 
                                    image: e.target.files[0]}
                                })
                                console.log(e.target.files[0])}}
                        />
                    </label> 
                    <Button
                        onClick={()=> this.ref.current.click()}
                        variant="secondary"
                        className=" mb-4"
                    >
                        Upload Image
                    </Button>   

                    <Form.Group>
                        <Form.Label>Brand</Form.Label>
                        <Form.Control 
                        id="brand"
                         value={this.state.product.brand}
                         onChange={(e)=> this.setState({
                            product:{
                                ...this.state.product,
                                brand:e.target.value
                            }
                        })}
                        type="text" 
                        placeholder="Brand" />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Price</Form.Label>
                        <Form.Control 
                         id="price"
                         value={this.state.product.price}
                        type="text" 
                        onChange={(e)=> this.setState({
                            product:{
                                ...this.state.product,
                                price:e.target.value
                            }
                        })}
                        placeholder="Price" />
                        
                    </Form.Group>

                    <Form.Group className="mt-3">
                        <Form.Label>Categories</Form.Label>
                        <Form.Control 
                        id={this.state.categoryId}
                        required
                        value={this.state.product.categoryId}
                        onChange={(e)=> {
                        console.log(e.target.value);
                        console.log(e.target[e.target.selectedIndex].id);
                        this.setState({
                            ...this.state,
                        product:{
                            ...this.state.product,
                            categoryId: e.target.value                  
                        }
                        })
                
                    }}
                        size="lg" 
                        as="select">
                        {this.state.categories && this.state.categories.map( category => 
                        <option key={category.id} id={category.id} >{category.name}</option>
                        )}
                        </Form.Control>
                    </Form.Group>

                   {/*  <Form.Group>
                        <Form.Label>Category</Form.Label>
                        <Form.Control
                         id="category"
                         value={this.state.postProduct.category}
                         onChange={(e)=> this.setState({
                            postProduct:{
                                ...this.state.postProduct,
                                category:e.target.value
                            }
                        })} 
                        type="text" 
                        placeholder="Category" />
                    </Form.Group> */}

                    <Form.Group>
                        <Form.Label>Description</Form.Label>
                        <Form.Control 
                        id="description"
                        value={this.state.product.description} 
                        onChange={(e)=> this.setState({
                            product:{
                                ...this.state.product,
                                description:e.target.value
                            }
                        })}
                        placeholder="description"
                        as="textarea" 
                        rows={3} />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                    </Form>                
            </Container>
        );
    }
}

export default AddProduct;