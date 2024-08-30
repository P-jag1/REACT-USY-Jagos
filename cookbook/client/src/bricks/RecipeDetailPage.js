import React from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import placeholderImg from '../img/placeholderImg.jpg';
import detailStyles from "../css/recipeDetailPage.module.css";

function RecipeDetailPage(props) {
  const recipe = props.recipeList.find((recipe) => recipe.id === props.recipeId);

  if (!recipe) {
    return <p>Někde nastala chyba, recept nebyl nalezen!</p>;
  }

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh', width: '75%' }}>
      <Row className="justify-content-center">
        <Col>
          <Card className={`text-center ${detailStyles.recipeCard}`}>
            <Card.Img src={recipe.imgUri} className={detailStyles.recipeImg}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = placeholderImg;
              }}
            />
            <Card.Body>
              <Card.Title className={detailStyles.recipeTitle}>{recipe.name}</Card.Title>             
              <div className={detailStyles.section}>
                <span className={detailStyles.label}>Postup:</span>
                <Card.Text className={detailStyles.recipeDescription}>{recipe.description}</Card.Text>
              </div>
              <div className={detailStyles.section}>
                <span className={detailStyles.label}>Ingredience:</span>
                <ListGroup variant="flush">
                  {recipe.ingredients.map((ingredient) => (
                    <ListGroup.Item key={ingredient.id} className="d-flex align-items-center">
                      <input type="checkbox" className={detailStyles.checkbox} />
                      <span className={detailStyles.ingredientText}>
                        <span style={{ fontWeight: 'bold' }}>
                          {props.ingredientsList.find((ingredientInList) => ingredientInList.id === ingredient.id).name}
                        </span>{" "}
                        - {ingredient.amount} {ingredient.unit}
                      </span>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default RecipeDetailPage;
