import Loader from 'components/Loader'
import { useGet_ProductsQuery } from 'generated'
import gql from 'graphql-tag'
import { Description, Title } from 'lib/styles'
import { NextPage } from 'next'
import { withUrqlClient } from 'next-urql'
import Link from 'next/link'
import React from 'react'
import styled from 'styled-components'

const GET_PRODUCTS = gql`
  query GET_PRODUCTS {
    listedProducts {
      id
      name
      slug
      dimensions {
        id
        height
        width
        depth
      }
      material
      color
      weight
      quantity
      images {
        id
        url
      }
    }
  }
`

const ProductsWrapper = styled.div`
  margin: 20px 50px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`

const ProductWrapper = styled.div`
  box-shadow: ${({ theme }) => theme.boxShadows.default.google};
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
  height: 300px;
  width: 300px;
  cursor: pointer;
  transition: all ease-in-out 0.2s;

  :hover {
    box-shadow: ${({ theme }) => theme.boxShadows.hover.google};
  }
`

const ProductImage = styled.img`
  width: 100%;
  height: 200px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`

const ProductName = styled.span`
  display: table;
  margin: auto;
  padding: 10px;
  font-size: 24px;
`

const StyledText = styled(Description)`
  display: table;
  margin: 10px auto;
  text-align: center;
`

const Products: NextPage<Props> = ({}) => {
  const [{ data, error }] = useGet_ProductsQuery()

  const groupedProducts = data?.listedProducts.reduce((prev, next) => {
    if (!prev[next.name]) {
      return { ...prev, [next.name]: [next] }
    } else {
      return { ...prev, [next.name]: [...prev[next.name], next] }
    }
  }, {})

  return (
    <>
      <Title>Produkte</Title>

      <ProductsWrapper>
        {groupedProducts ? (
          Object.keys(groupedProducts).map((groupedProduct) => {
            const { name, slug, images, id } = groupedProducts[
              groupedProduct
            ][0]

            return (
              <Link key={id} href={`/produkte2/${slug}`}>
                <ProductWrapper>
                  {images?.length > 0 && (
                    <ProductImage alt='Produkt Bild' src={images[0].url} />
                  )}
                  <ProductName>{name}</ProductName>
                </ProductWrapper>
              </Link>
            )
          })
        ) : (
          <Loader />
        )}
      </ProductsWrapper>
    </>
  )
}

export default withUrqlClient(
  () => ({
    url: `${process.env.API_URL}/api/graphql`,
  }),
  { ssr: true }
)(Products)

interface Props {}
