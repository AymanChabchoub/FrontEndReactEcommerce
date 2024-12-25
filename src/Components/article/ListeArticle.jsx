import React, { useEffect, useState } from 'react'
import Affichearticle from './Affichearticle';
import {fetcharticlesPagination} from "../../Services/articleservice"
import Pagination from './Pagination';

const ListeArticle = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [articles, setArticles] = useState([]);
  const [limit, setLimit]=useState(5)

const fetchProducts = async (page,limit) => {
try {
  const res = await fetcharticlesPagination(page,limit)
  setArticles(res.data.products);
  setTotalPages(res.data.totalPages);

} catch (error) {
console.log(error);
}
};
useEffect(() => {

fetchProducts(currentPage,limit);
}, [currentPage,limit]);
const handlePrevPage = () => {
  if (currentPage > 1) {
  setCurrentPage(currentPage - 1);
  }
  };
  
  const handleNextPage = () => {
  if (currentPage < totalPages) {
  setCurrentPage(currentPage + 1);
  }
  };
  const handlePageChange = (page) => {
  setCurrentPage(page);
  };
return (
<div>
<Affichearticle articles={articles}/>
<Pagination handlePrevPage={handlePrevPage}
handleNextPage={handleNextPage}
handlePageChange={handlePageChange}
totalPages={totalPages}
currentPage ={currentPage }
/>
</div>

)
  
}

export default ListeArticle