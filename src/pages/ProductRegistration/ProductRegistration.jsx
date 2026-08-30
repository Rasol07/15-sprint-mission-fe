import { useEffect, useState } from "react";
import { FormInput } from "../../components/FormInput/FormInput";
import styles from "./ProductRegistration.module.css";
import { createProduct } from "../../api/products";

export function ProductRegistration() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: 0,
    tags: [],
    images: [],
  });

  const [isValidate, setIsValidate] = useState(false);

  // tag 엔터키 눌렀을 때 배열로 하나하나 들어가게 만들어야 함.
  // 엔터키 눌렀을 때 그 버튼 같은 거 생겨나야함.

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (formData) => {
    const product = await createProduct(formData);
    console.log(product);
  };
  return (
    <div className={styles.registrationContainer}>
      <div className={styles.registrationHeader}>
        <h2>상품 등록하기</h2>
        <button
          className={`${styles.registrationBtn} ${
            isValidate ? styles.active : ""
          }`}
          onClick={() => handleSubmit(formData)}
        >
          등록
        </button>
      </div>

      <FormInput
        label="상품명"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="상품명을 입력해주세요"
      />

      <FormInput
        label="상품 소개 "
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="상품 소개를 입력해주세요"
        multiline
      />

      <FormInput
        label="판매가격"
        name="price"
        value={formData.price}
        onChange={handleChange}
        placeholder="판매 가격을 입력해주세요"
      />

      <FormInput
        label="태그"
        name="tags"
        value={formData.tags}
        onChange={handleChange}
        placeholder="태그를 입력해주세요"
      />
    </div>
  );
}
