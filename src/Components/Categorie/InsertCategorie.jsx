import React, { useState } from 'react';
import axios from 'axios';
import "./categorie.css";
import { useNavigate } from 'react-router-dom';

const InsertCategorie = () => {
    const navigate = useNavigate();
    const [categorie, setCategorie] = useState({
        nomcategorie: '',
        imagecategorie: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Validation des champs
        if (!categorie.nomcategorie || !categorie.imagecategorie) {
            setError("Veuillez remplir tous les champs.");
            return;
        }

        setError(''); // Réinitialise les erreurs
        setLoading(true); // Active le spinner

        try {
            // Envoi des données au serveur
            await axios.post("https://backendecomgs1.vercel.app/api/api/categories", categorie);
            console.log("Catégorie ajoutée :", categorie);
            navigate("/categories"); // Redirige après succès
        } catch (err) {
            console.error("Erreur lors de l'insertion :", err);
            setError("Erreur ! Insertion non effectuée.");
        } finally {
            setLoading(false); // Désactive le spinner
        }
    };

    return (
        <div className="form-container">
            <form className="categorie-form" onSubmit={handleSubmit}>
                <h2>Ajouter Catégorie</h2>

                {error && <div className="error-message">{error}</div>} {/* Message d'erreur */}

                <div className="form-group">
                    <label htmlFor="nomcategorie">Nom catégorie</label>
                    <input
                        type="text"
                        id="nomcategorie"
                        value={categorie.nomcategorie}
                        onChange={(e) => setCategorie({ ...categorie, nomcategorie: e.target.value })}
                        className="form-input"
                        placeholder="Entrez nom catégorie"
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
                        placeholder="URL de l'image"
                    />
                    {categorie.imagecategorie && (
                        <img
                            src={categorie.imagecategorie}
                            alt="Aperçu"
                            width="70"
                        />
                    )}
                </div>

                <button
                    type="submit"
                    className="form-submit-button"
                    disabled={loading} // Désactive le bouton si en cours de chargement
                >
                    {loading ? "Enregistrement..." : "Enregistrer"}
                </button>
            </form>
        </div>
    );
};

export default InsertCategorie;
