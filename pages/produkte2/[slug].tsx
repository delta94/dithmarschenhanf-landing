import { CartAdd } from '@styled-icons/boxicons-solid/CartAdd'
import EinkaufswagenModal from 'components/EinkaufswagenModal'
import ImageCarousel from 'components/ImageCarousel'
import { baseUrl } from 'components/Meta'
import Select from 'components/Select'
import { useShoppingCart } from 'components/ShoppingCart'
import { Get_ProductQuery, ListedProduct } from 'generated'
import gql from 'graphql-tag'
import { constructDimensionString, createVariantName } from 'lib/utils'
import { NextPage, NextPageContext } from 'next'
import { ProductJsonLd } from 'next-seo'
import { withUrqlClient } from 'next-urql'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import Markdown from 'react-markdown'
import styled from 'styled-components'
import { OperationResult } from 'urql'

const GET_PRODUCT = gql`
  query GET_PRODUCT($slug: String!) {
    listedProduct(where: { slug: $slug }) {
      id
      name
      slug
      weightUnit
      dimensions {
        id
        height
        width
        depth
      }
      material
      color
      weight
      listedInventories {
        id
        amount
        listPrice
      }
      variants {
        id
        slug
        description
        dimensions {
          id
          height
          width
          depth
        }
        material
        color
        weight
        listedInventories {
          id
          amount
          listPrice
        }
      }
      lengthUnit
      images {
        id
        url
      }
      currencySymbol
      description
    }
  }
`

const ProductWrapper = styled.div`
  margin: 20px;
`

const Title = styled.h1`
  display: table;
  margin: 20px auto 80px auto;
  font-size: 45px;

  @media (max-width: 767px) {
    display: none;
  }
`

const Description = styled.p`
  font-size: 20px;
`

const BuySection = styled.div`
  display: flex;
  align-items: flex-end;

  @media (max-width: 767px) {
    flex-direction: column;
    align-items: center;
  }
`

const BuyButton = styled.button`
  padding: 10px 20px;
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: 10px;
  color: white;
  border: none;
  cursor: pointer;
  transition: all linear 0.1s;
  box-shadow: ${({ theme }) => theme.boxShadows.default.google};
  font-size: 24px;

  :hover {
    box-shadow: ${({ theme }) => theme.boxShadows.hover.google};
  }
`

const ContentWrapper = styled.section`
  display: flex;
  margin-top: 20px;

  @media (max-width: 767px) {
    flex-direction: column;
  }
`

const DescriptionWrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 60%;

  @media (max-width: 767px) {
    width: 100%;
  }
`

const StyledSelect = styled(Select)`
  font-size: 24px;
  margin: 0 10px;

  @media (max-width: 767px) {
    margin: 20px;
  }

  select {
    height: 60px;
  }
`

const Price = styled.span`
  font-size: 60px;
`

const Properties = styled.table`
  border: none;
  font-size: 20px;
  margin: 20px 0;
  th,
  td {
    border: none;
  }

  td {
    padding: 10px 40px;
  }

  td:nth-child(1) {
    font-weight: bold;
  }
`

const StyledCarousel = styled(ImageCarousel)`
  width: 40%;
  margin-top: 50px;

  @media (max-width: 767px) {
    width: 100%;
  }
`

const ProductInfos = styled.section`
  display: flex;
  flex-direction: column;

  > * {
    margin: 10px 0;
  }

  @media (max-width: 767px) {
    align-items: center;
  }
`

const MobileTitle = styled.h1`
  font-size: 45px;
  display: table;
  margin: 20px auto;

  @media (min-width: 767px) {
    display: none;
  }
`

const ProductLoadingError = styled.h1`
  display: table;
  margin: 50px auto;
`

const Product: NextPage<Props> = ({ product }) => {
  const router = useRouter()
  const [amount, setAmount] = useState(1)
  const { addToCart } = useShoppingCart()
  const [isModal, setIsModal] = useState(false)

  if (!product) {
    return (
      <ProductLoadingError>
        Es gab ein Problem das Produkt zu laden, bitte versuchen sie es erneut.
      </ProductLoadingError>
    )
  }
  console.log(product)

  const handleAdd = () => {
    let left = amount

    if (product?.listedInventories?.length > 0) {
      for (const listedInventory of product?.listedInventories) {
        if (left > 0) {
          addToCart({
            total: product?.listedInventories.reduce(
              (prev, next) => prev + next.amount,
              0
            ),
            product,
            id: listedInventory.id,
            listPrice: listedInventory.listPrice,
            amount:
              amount > listedInventory.amount ? listedInventory.amount : amount,
          })
          left = left - listedInventory.amount
        }
      }
    }

    setIsModal(true)
  }

  const price = product?.listedInventories[0].listPrice.toFixed(2)

  return (
    <>
      <ProductJsonLd
        productName={product?.name}
        brand='Dithmarschenhanf'
        offers={[
          {
            price,
            seller: { name: 'Dithmarschenhanf' },
            priceCurrency: 'EUR',
            itemCondition: 'https://schema.org/NewCondition',
            availability: 'https://schema.org/InStock',
            url: `${baseUrl}/produkte2/${product?.slug}`,
          },
        ]}
      />
      <ProductWrapper>
        <MobileTitle>{product?.name}</MobileTitle>
        <ContentWrapper>
          {product?.images?.length > 0 && (
            <StyledCarousel
              name={product?.name}
              images={product?.images.map((i) => i.url)}
            />
          )}
          <DescriptionWrapper>
            <Title>{product?.name}</Title>
            <ProductInfos>
              <Price>{price}€</Price>
              <StyledSelect
                label='Variante'
                onChange={(e) =>
                  router.replace(
                    `/produkte2/[slug]`,
                    `/produkte2/${e.target.value}`
                  )
                }
                value={product}
                options={[
                  product,
                  ...(product?.variants ? product.variants : []),
                ].map((variant) => ({
                  value: variant?.slug,
                  label: createVariantName(
                    variant,
                    product?.lengthUnit,
                    product?.weightUnit
                  ),
                }))}
              />
              <BuySection>
                <StyledSelect
                  label='Menge'
                  options={new Array(
                    product?.listedInventories.reduce(
                      (prev, next) => prev + next.amount,
                      0
                    )
                  )
                    .fill(0)
                    .map((v, ind) => ({
                      value: ind + 1,
                      label: String(ind + 1),
                    }))}
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                />
                <BuyButton onClick={() => handleAdd()}>
                  In den Warenkorb
                  <CartAdd size={40} style={{ marginLeft: 5 }} />
                </BuyButton>
              </BuySection>
              {(product?.material ||
                product?.color ||
                product?.weight ||
                product?.dimensions ||
                product?.quantity) && (
                <Properties>
                  <tbody>
                    {product?.material && (
                      <tr>
                        <td>Material:</td>
                        <td>{product?.material}</td>
                      </tr>
                    )}
                    {product?.color && (
                      <tr>
                        <td>Farbe:</td>
                        <td>{product?.color}</td>
                      </tr>
                    )}
                    {product?.weight && (
                      <tr>
                        <td>Gewicht:</td>
                        <td>
                          {product?.weight}
                          {product?.weightUnit}.
                        </td>
                      </tr>
                    )}
                    {product?.dimensions && (
                      <tr>
                        <td>Abmaße:</td>
                        <td>
                          {constructDimensionString(
                            product?.dimensions,
                            product?.lengthUnit
                          )}
                        </td>
                      </tr>
                    )}
                    {product?.quantity && (
                      <tr>
                        <td>Menge:</td>
                        <td>{product?.quantity} Stück</td>
                      </tr>
                    )}
                  </tbody>
                </Properties>
              )}
            </ProductInfos>
            <Description>
              <Markdown source={product?.description} />
            </Description>
          </DescriptionWrapper>
        </ContentWrapper>
        {isModal && <EinkaufswagenModal onClose={() => setIsModal(false)} />}
      </ProductWrapper>
    </>
  )
}

export default withUrqlClient(
  () => ({
    url: `${process.env.API_URL}/api/graphql`,
  }),
  { ssr: true }
)(Product)

Product.getInitialProps = async ({ urqlClient, query }: NextPageContext) => {
  const response: OperationResult<Get_ProductQuery> = await urqlClient
    .query(GET_PRODUCT, { slug: query.slug as string })
    .toPromise()
  console.log(response)

  return { product: response?.data?.listedProduct as any }
}

// export async function getStaticProps({ params }) {
//   const product = products.find((product) => product.slug === params.slug)

//   return { props: { product } }
// }

// export async function getStaticPaths() {
//   const paths = products.map((product) => ({
//     params: { slug: product.slug },
//   }))

//   return { paths, fallback: false }
// }

interface Props {
  product: Partial<ListedProduct>
}
