import React from 'react'



import Editarticle from "./Components/article/EditArticle";
import Insertarticle from "./Components/article/InsertArticl";
import Listarticles from "./Components/article/ListeArticle";
import Editcategorie from "./Components/Categorie/EditCategorie";
import Insertcategorie from "./Components/Categorie/InsertCategorie";
import Listcategories from "./Components/Categorie/ListCategorie";
import Editscategorie from "./Components/Scategorie/EditScategorie";
import Insertscategorie from "./Components/Scategorie/InsertScategorie";
import Listscategories from "./Components/Scategorie/ListScategorie";
import Viewarticle from "./Components/article/ViewArticle";
import Viewcategorie from "./Components/Categorie/ViewCategorie";
import Viewscategorie from "./Components/Scategorie/ViewScategorie";
import { BrowserRouter as Router,Routes, Route } from "react-router-dom";
import Menu from "./Components/Menu";
import Listarticlescard from "./Components/article/ListeArticleCard";
import { CartProvider } from "use-shopping-cart";
import Cart from './Components/Client/Cart'
const App = () => {
  return (
    <>
    <div>
    <CartProvider>
    <Router>
      <Menu/> 
        <Routes>
        <Route path="/articles" element={<Listarticles/>}/>
        <Route path="/articles/add" element={<Insertarticle/>}/>
        <Route path="/article/edit/:id" element={<Editarticle/>}/>
        <Route path="/article/view/:id" element={<Viewarticle/>}/>
        <Route path="/categories" element={<Listcategories/>}/>
        <Route path="/categories/add" element={<Insertcategorie/>}/>
        <Route path="/categories/edit/:id" element={<Editcategorie/>}/>
        <Route path="/categories/view/:id" element={<Viewcategorie/>}/>
        <Route path="/scategories" element={<Listscategories/>}/>
        <Route path="/scategories/add" element={<Insertscategorie/>}/>
        <Route path="/scategories/edit/:id" element={<Editscategorie/>}/>
        <Route path="/scategories/view/:id" element={<Viewscategorie/>}/>
        <Route path="/articlescard" element={<Listarticlescard/>}/>
        <Route path='/cart' element={<Cart/>}/>
        </Routes>
    </Router>
    </CartProvider>
    </div>
    </>
  )
}

export default App