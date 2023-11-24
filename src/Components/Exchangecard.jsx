import { Heading, Image, Text, VStack } from '@chakra-ui/react'
import React from 'react'

const Exchangecard = ({ name, image, url, rank }) => {
    return (
        <div>
            <a href={url} target={"blank"}>
                <VStack w='52' p='8' shadow={'lg'} borderRadius={'lg'} transition={'all 0.4s'} m='2'
                 css={{ "&:hover": {transform:"scale(1.1)"}}}
                 >
                <Image src={image} w="10" h={'10'} objectFit={'contain'} alt={'Exchange'} />
                <Heading size={'md'} noOfLines={'1'}>{rank}</Heading>
                <Text noOfLines={'1'}>{name}</Text>
            </VStack>
        </a>
    </div >
  )
}

export default Exchangecard