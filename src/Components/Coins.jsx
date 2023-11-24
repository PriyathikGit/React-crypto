import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { server } from '../index'
import { Button, Container, HStack, Radio, RadioGroup, } from '@chakra-ui/react';
import Loader from './Loader';
import Error from './Error';
import Coinscard from './Coinscard';


const Coins = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [currency, setCurrency] = useState('inr');

  const currencySymbol = currency === "inr" ? "₹" : currency === "eur" ? '€' : "$";

  const buttons = new Array(132).fill(1)

  const changePage = (page) => {
    setPage(page)
    setLoading(true)
  }

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const { data } = await axios.get(`${server}/coins/markets?vs_currency=${currency}&page=${page}`);
        setCoins(data)
        setLoading(false)
      } catch (error) {
        setError(true)
        setLoading(false)
      }

    }
    // fetch this function whenver this function mount
    fetchCoins();
  }, [currency, page])

  if (error) return <Error message={"error while fetching coins"} />
  return (

    <Container maxW={'container.xl'} >
      {loading ? <Loader /> : (
        <>
          <RadioGroup value={currency} onChange={setCurrency} p={'8'}>
            <HStack spacing={'4'}>
              <Radio value={'inr'}>INR</Radio>
              <Radio value={'eur'}>EUR</Radio>
              <Radio value={'usd'}>USD</Radio>
            </HStack>
          </RadioGroup>


          <HStack direction={['column', 'row']} wrap={'wrap'} justifyContent={"space-around"}>
            {
              coins.map((i) => {
                return <Coinscard name={i.name} symbol={i.symbol} image={i.image} id={i.id} rank={i.trust_score_rank} price={i.current_price} key={i.id} currencySymbol={currencySymbol} />
              })
            }
          </HStack>


          <HStack w={'full'} overflow={'auto'} p={'8'}>
            {
              buttons.map((items, index) => {
                return <Button key={index} bgColor={"blackAlpha.900"} color={'white'} onClick={() => changePage(index + 1)}>
                  {index + 1}
                </Button>
              })
            }
          </HStack>
        </>
      )}
    </Container>
  )
}

export default Coins

