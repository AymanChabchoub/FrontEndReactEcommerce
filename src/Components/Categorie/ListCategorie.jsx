import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

const ListCategorie = () => {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);

    // Fetch categories
    const getCategories = async () => {
        try {
            const res = await axios.get("https://laravel-backend-seven.vercel.app/api/api/categories");
            setCategories(res.data);
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    // Delete category
    const deleteCategorie = async (id) => {
        try {
            await axios.delete(`https://laravel-backend-seven.vercel.app/api/api/categories/${id}`);
            alert("Category deleted successfully");
            // Update the categories list after deletion
            setCategories(categories.filter((cat) => cat.id !== id));
        } catch (error) {
            console.error("Error deleting category:", error);
            alert("Error deleting category");
        }
    };

    useEffect(() => {
        getCategories();
    }, []);

    return (
        <div>
            <Button variant="contained" style={{ backgroundColor: 'black' }}>
                <Link to="/categories/add" style={{ color: 'white', textDecoration: 'none' }}>
                    <i className="fa-solid fa-plus-square"></i> Nouveau
                </Link>
            </Button>
            <h2>Liste des catégories</h2>
            <table className='table table-striped'>
                <thead>
                    <tr>
                        <td>Nom catégorie</td>
                        <td>Image catégorie</td>
                        <td>Update</td>
                        <td>Delete</td>
                    </tr>
                </thead>
                <tbody>
                    {categories.map((cat, index) => (
                        <tr key={index}>
                            <td>{cat.nomcategorie}</td>
                            <td>
                                <img src={cat.imagecategorie} alt={cat.nomcategorie} width={100} height={100} />
                            </td>
                            <td>
                                <button
                                    className='btn btn-warning btn-sm'
                                    onClick={() => navigate(`/categories/edit/${cat.id}`)}
                                >
                                    Update
                                </button>
                            </td>
                            <td>
                                <button
                                    className='btn btn-danger btn-sm'
                                    onClick={() => deleteCategorie(cat.id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ListCategorie;
