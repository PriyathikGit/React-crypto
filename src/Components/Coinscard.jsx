import React from 'react'
import { VStack, Image, Heading, Text } from "@chakra-ui/react"
import { Link } from 'react-router-dom'

const Coinscard = ({ name, image, symbol, price, id,currencySymbol='₹' }) => {
    return (
        //using link because we want react page not external page
        <Link to={`/coin/${id}`}>
            <div>
                <VStack w='52' p='8' shadow={'lg'} borderRadius={'lg'} transition={'all 0.4s'} m='2'
                    css={{ "&:hover": { transform: "scale(1.1)" } }}
                >
                    <Image src={image} w="10" h={'10'} objectFit={'contain'} alt={'Exchange'} />
                    <Heading size={'md'} noOfLines={'1'}>{symbol}</Heading>
                    <Text noOfLines={'1'}>{name}</Text>
                    <Text>Price : {price ? `${currencySymbol}${price}` :''}</Text>
                </VStack>
            </div >
        </Link>

    )
}

export default Coinscard