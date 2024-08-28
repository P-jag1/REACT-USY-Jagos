import React from "react";
import { useState, useCallback } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Modal, Form, Button } from "react-bootstrap";
import debounce from 'lodash/debounce';
import modalStyles from "../css/recipeForm.module.css";

const MAX_DESCRIPTION_LENGTH = 1500;

function RecipeForm({ setNewRecipe, ingredientsList }) {
    const [recipeData, setRecipeData] = useState({
        name: "",
        description: "",
        imgUri: "",
        ingredients: [{ id: "", amount: "", unit: "" }],
    });

    const units = ['ks', 'l', 'ml', 'g', 'kg', 'lžíce', 'lžička', 'špetka'];

    const [validated, setValidated] = useState(false);
    const [errors, setErrors] = useState({
        description: false,
        ingredients: false,
        duplicateIngredients: false,
    });

    const stripHtmlTags = (html) => {
        const doc = new DOMParser().parseFromString(html, 'text/html');
        return doc.body.textContent || "";
    };
    

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
        setErrors(prev => ({ ...prev, duplicateIngredients: false }));
        updateRecipeData("ingredients", [...recipeData.ingredients, { id: "", amount: "", unit: "" }]);
    };

    const handleDeleteIngredient = (index) => {
        updateRecipeData("ingredients", recipeData.ingredients.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (hasDuplicateIngredients()) {
            setErrors(prev => ({ ...prev, duplicateIngredients: true }));
            return;
        }

        if (!validateForm()) {
            setValidated(true);
            return;
        }

        const formDataToSend = {
            name: recipeData.name,
            description: stripHtmlTags(recipeData.description),
            imgUri: recipeData.imgUri,
            ingredients: recipeData.ingredients.map((ingredient) => ({
              id: ingredient.id,
              amount: parseFloat(ingredient.amount), 
              unit: ingredient.unit,
            })),
          };

          try {
            const response = await fetch('http://localhost:3000/recipe/create', { 
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(formDataToSend),
            });
      
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
      
            const result = await response.json();
            console.log(result);
            handleClose();
          } catch (error) {
            console.error('Chyba odeslání formuláře:', error);
          }
    };

    const validateForm = () => {
        const isDescriptionEmpty = !recipeData.description.trim();
        const hasEmptyIngredient = recipeData.ingredients.some(ingredient => !ingredient.id || !ingredient.amount || !ingredient.unit);
        
        setErrors(prev => ({
            ...prev,
            description: isDescriptionEmpty,
            ingredients: hasEmptyIngredient,
        }));

        return !isDescriptionEmpty && !hasEmptyIngredient && !hasDuplicateIngredients();
    };

    const hasDuplicateIngredients = () => {
        const ingredientIds = recipeData.ingredients.map((ingredient) => ingredient.id);
        return new Set(ingredientIds).size !== ingredientIds.length;
    };

    const handleDescriptionChange = (value) => {
        debouncedDescriptionChange(value);
    };

    const debouncedDescriptionChange = useCallback(
        debounce((value) => {
            if (value.length <= MAX_DESCRIPTION_LENGTH) {
                updateRecipeData("description", value);
                setErrors(prev => ({ ...prev, description: false }));
            } else {
                setErrors(prev => ({ ...prev, description: true }));
            }
        }, 300),
        []
    );

    const handleClose = () => setNewRecipe(false);

    return (
        <Modal show onHide={handleClose} className={modalStyles.modal}>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Modal.Header closeButton>
                    <Modal.Title className={modalStyles.title}>Přidat recept</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3">
                        <Form.Label>Název receptu</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Název receptu"
                            maxLength={85}
                            required
                            value={recipeData.name}
                            onChange={(e) => updateRecipeData("name", e.target.value)}
                        />
                        <Form.Control.Feedback type="invalid">
                            Zadejte název receptu.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Postup receptu</Form.Label>
                        <ReactQuill
                            theme="snow"
                            placeholder="Popis přípravy receptu"
                            value={recipeData.description}
                            onChange={handleDescriptionChange}
                        />
                        {errors.description && (
                            <p className="text-danger">
                                Popis nesmí být více než {MAX_DESCRIPTION_LENGTH} znaků.
                            </p>
                        )}
                    </Form.Group>
                    <Form.Group className="flex-column mb-3">
                        <Form.Label>Ingredience</Form.Label>
                        {recipeData.ingredients.map((ingredient, index) => (
                            <div key={index} className="d-flex flex-row mb-2 gap-1">
                                <Form.Select
                                    value={ingredient.id}
                                    required
                                    onChange={(e) => handleIngredientUpdate(index, "id", e.target.value)}
                                >
                                    <option value="" disabled hidden>Ingredience</option>
                                    {ingredientsList.map((ingredientOption, id) => (
                                        <option key={id} value={ingredientOption.id}>
                                            {ingredientOption.name}
                                        </option>
                                    ))}
                                </Form.Select>
                                <Form.Control
                                    type="number"
                                    placeholder="Množství"
                                    value={ingredient.amount}
                                    required
                                    step="0.1"
                                    min={0.1}
                                    max={5000}
                                    onChange={(e) => handleIngredientUpdate(index, "amount", e.target.value)}
                                />
                                <Form.Select
                                    type="text"
                                    placeholder="Jednotky"
                                    value={ingredient.unit}
                                    required
                                    onChange={(e) => handleIngredientUpdate(index, "unit", e.target.value)}
                                >
                                <option value="">Jednotky</option>
                                    {units.map((unit, i) => (
                                <option key={i} value={unit}>{unit}</option>
                                 ))}
                                </Form.Select>
                                {index > 0 &&
                                    <Button className={modalStyles.modalButtonRemove} onClick={() => handleDeleteIngredient(index)}>
                                        X
                                    </Button>
                                }
                            </div>
                        ))}
                        {errors.ingredients && (
                            <p className="text-danger">Vyplňte prosím všechny údaje o ingredincích</p>
                        )}
                        {errors.duplicateIngredients && (
                            <p className="text-danger">Tato Ingredience již existuje.</p>
                        )}
                        <Button className={modalStyles.modalButton} onClick={handleNewIngredient}>
                            Nová ingredience
                        </Button>
                    </Form.Group>
                    <Modal.Footer>
                        <Button className={modalStyles.modalButtonClose} onClick={handleClose}>
                            Zavřít
                        </Button>
                        <Button className={modalStyles.modalButton} type="submit">
                            Přidat recept
                        </Button>
                    </Modal.Footer>
                </Modal.Body>
            </Form>
        </Modal>
    );
}

export default RecipeForm;
