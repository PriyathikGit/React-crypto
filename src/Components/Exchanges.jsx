import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { server } from '../index'
import { Container, HStack, } from '@chakra-ui/react';
import Loader from './Loader';
import Exchangecard from './Exchangecard';
import Error from './Error';

const Exchanges = () => {
  const [exchanges, setExchanges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchExchanges = async () => {
      try {
        const { data } = await axios.get(`${server}/exchanges`);
        setExchanges(data)
        setLoading(false)
      } catch (error) {
        setError(true)
        setLoading(false)
      }

    }
    // fetch this function whenver this function mount
    fetchExchanges();
  }, [])

  if (error) return <Error />
  return (

    <Container maxW={'container.xl'}  >
      {loading ? <Loader /> : (
        <>
          <HStack direction={['column', 'row']} wrap={'wrap'} p={'4'} justifyContent={"space-around"}>
            {
              exchanges.map((i) => {
                return <Exchangecard name={i.name} image={i.image} rank={i.trust_score_rank} url={i.url} key={i.id} />
              })
            }
          </HStack>
        </>
      )}
    </Container>
  )
}

export default Exchanges