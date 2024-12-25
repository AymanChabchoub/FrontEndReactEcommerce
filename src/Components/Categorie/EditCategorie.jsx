import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./categorie.css";
import { useParams, useNavigate } from 'react-router-dom';

const EditCategorie = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [categorie, setCategorie] = useState({
        nomcategorie: "",
        imagecategorie: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // Charger les détails de la catégorie
    const loadCategorie = async () => {
        setLoading(true);
        try {
            const res = await axios.get(`https://backendecomgs1.vercel.app/api/api/categories/${id}`);
            setCategorie(res.data);
        } catch (error) {
            console.error("Erreur lors du chargement de la catégorie :", error);
            setError("Impossible de charger la catégorie. Veuillez réessayer.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadCategorie();
    }, [id]);

    // Gérer la soumission du formulaire
    const handleSubmit = async (event) => {
        event.preventDefault();

        // Validation des champs
        if (!categorie.nomcategorie || !categorie.imagecategorie) {
            setError("Veuillez remplir tous les champs.");
            return;
        }

        setError(""); // Réinitialiser les erreurs
        setLoading(true); // Activer le chargement

        try {
            await axios.put(`https://backendecomgs1.vercel.app/api/api/categories/${id}`, categorie);
            alert("Catégorie mise à jour avec succès.");
            console.log('categorie',categorie)
            
        } catch (error) {
            console.error("Erreur lors de la mise à jour de la catégorie :", error);
            setError("Erreur lors de la mise à jour. Veuillez réessayer.");
        } finally {
            setLoading(false); // Désactiver le chargement
        }
    };

    return (
        <div className="form-container">
            <form className="categorie-form" onSubmit={handleSubmit}>
                <h2>Modifier Catégorie</h2>

                {error && <div className="error-message">{error}</div>} {/* Affichage des erreurs */}

                <div className="form-group">
                    <label htmlFor="nomcategorie">Nom catégorie</label>
                    <input
                        type="text"
                        id="nomcategorie"
                        value={categorie.nomcategorie}
                        onChange={(e) => setCategorie({ ...categorie, nomcategorie: e.target.value })}
                        className="form-input"
                        placeholder="Entrez nom catégorie"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="imagecategorie">Image</label>
                    <input
                        type="text"
                        id="imagecategorie"
                        value={categorie.imagecategorie}
                        onChange={(e) => setCategorie({ ...categorie, imagecategorie: e.target.value })}
                        className="form-input"
                        placeholder="Entrez URL de l'image"
                        required
                    />
                    {categorie.imagecategorie && (
                        <img src={categorie.imagecategorie} alt="Aperçu" width="70" />
                    )}
                </div>

                <button
                    type="submit"
                    className="form-submit-button"
                    disabled={loading} // Désactiver le bouton si en cours de chargement
                >
                    {loading ? "Mise à jour..." : "Enregistrer"}
                </button>
            </form>
        </div>
    );
};

export default EditCategorie;
