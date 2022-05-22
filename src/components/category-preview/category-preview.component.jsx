import {
  CategoryPreviewContainer,
  TitleLink,
  Title,
  Preview,
} from "./category-preview.styles.jsx";
import ProductCard from "../product-card/product-card.component";

const CategoryPreview = ({ title, products }) => {
  return (
    <CategoryPreviewContainer>
      <Title>
        <TitleLink to={title.toLowerCase()}>{title.toUpperCase()}</TitleLink>
      </Title>

      <Preview>
        {products
          .filter((el, index) => index < 4)
          .map((product) => {
            return <ProductCard key={product.id} product={product} />;
          })}
      </Preview>
    </CategoryPreviewContainer>
  );
};

export default CategoryPreview;
