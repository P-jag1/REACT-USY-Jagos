import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import modalStyles from "../css/recipeForm.module.css";
import { Modal, Form, Button } from "react-bootstrap";
import { useState } from "react";

function RecipeForm({ setNewRecipe, ingredientsList }) {
    const [recipeData, setRecipeData] = useState({
        name: "",
        description: "",
        ingredients: [{ name: "", amount: "", unit: "" }],
        image: null,
    });

    const updateRecipeData = (field, value) => {
        setRecipeData(prev => ({ ...prev, [field]: value }));
    };

    const handleIngredientUpdate = (index, field, value) => {
        const updatedIngredients = recipeData.ingredients.map((ingredient, i) =>
            i === index ? { ...ingredient, [field]: value } : ingredient
        );
        updateRecipeData("ingredients", updatedIngredients);
    };

    const handleNewIngredient = () => {
        updateRecipeData("ingredients", [...recipeData.ingredients, { name: "", amount: "", unit: "" }]);
    };

    const handleDeleteIngredient = (index) => {
        updateRecipeData("ingredients", recipeData.ingredients.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        e.stopPropagation();

        const formDataToSend = new FormData();
        Object.entries(recipeData).forEach(([key, value]) => formDataToSend.append(key, value));

        console.log(recipeData);
        handleClose();
    };

    const handleClose = () => setNewRecipe(false);

    return (
        <Modal show onHide={handleClose} className={modalStyles.modal}>
            <Modal.Header closeButton>
                <Modal.Title className={modalStyles.title}>Přidat recept</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Název receptu</Form.Label>
                        <Form.Control type="text" placeholder="Název receptu" value={recipeData.name} onChange={(e) => updateRecipeData("name", e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Postup receptu</Form.Label>
                        <ReactQuill theme="snow" placeholder="Popis přípravy receptu" value={recipeData.description} onChange={(value) => updateRecipeData("description", value)} />
                    </Form.Group>
                    <Form.Group className="flex-column mb-3">
                        <Form.Label>Ingredience</Form.Label>
                        {recipeData.ingredients.map((ingredient, index) => (
                            <div key={index} className="d-flex flex-row mb-2 gap-1">
                                <Form.Select value={ingredient.name} onChange={(e) => handleIngredientUpdate(index, "name", e.target.value)}>
                                    <option value="" disabled>Ingredience</option>
                                    {ingredientsList.map((ingredient, id) => (
                                        <option key={id} value={ingredient.name}>{ingredient.name}</option>
                                    ))}
                                </Form.Select>
                                <Form.Control
                                    type="number"
                                    placeholder="Množství"
                                    value={ingredient.amount}
                                    onChange={(e) => handleIngredientUpdate(index, "amount", e.target.value)}
                                />
                                <Form.Control
                                    type="text"
                                    placeholder="Jednotky"
                                    value={ingredient.unit}
                                    onChange={(e) => handleIngredientUpdate(index, "unit", e.target.value)}
                                />
                                <Button className={modalStyles.modalButtonRemove} onClick={() => handleDeleteIngredient(index)}>
                                    X
                                </Button>
                            </div>
                        ))}
                        <Button className={modalStyles.modalButton} onClick={handleNewIngredient}>
                            Nová ingredience
                        </Button>
                    </Form.Group>
                    <Modal.Footer>
                        <div className={modalStyles.footer}>
                            <Button className={modalStyles.modalButtonClose} onClick={handleClose}>
                                Zavřít
                            </Button>
                            <Button className={modalStyles.modalButton} type="submit">
                                Přidat recept
                            </Button>
                        </div>
                    </Modal.Footer>
                </Form>
            </Modal.Body>
        </Modal>
    );
}

export default RecipeForm;