import { Box, Text, Flex, Avatar, Spacer } from "@chakra-ui/react";
import { FaBed, FaBath } from "react-icons/fa";
import { BsGridFill } from "react-icons/bs";
import { GoVerified } from "react-icons/go";
import millify from "millify";
import HTMLReactParser from "html-react-parser";

import { baseUrl, fetchApi } from "../../utils/fetchApi";
import ImageScrollBar from "../../components/ImageScrollbar.jsx";
import { sanitize } from "isomorphic-dompurify";
import Head from "next/head";

const PropertyDetails = ({
   propertyDetails: {
      price,
      rentFrequency,
      rooms,
      title,
      baths,
      area,
      agency,
      isVerified,
      description,
      type,
      purpose,
      furnishingStatus,
      amenities,
      photos,
   }
}) => {
   return (
      <>
         <Head>
            <title>{title}</title>
            <meta name="description" content={title} />
         </Head>
         <Box maxWidth="1000px" margin="auto" p="4">
            {photos && <ImageScrollBar data={photos} />}
            <Box w="full" p="6">
               <Flex paddingTop="2" alignItems="center" justifyContent="space-between">
                  <Flex alignItems="center">
                     <Box paddingRight="3" color="green.400">
                        {isVerified && <GoVerified />}
                     </Box>
                     <Text fontWeight="bold" fontSize="lg">
                        AED {millify(price)}
                        {rentFrequency && `/${rentFrequency}`}
                     </Text>
                  </Flex>
                  <Box>
                     <Avatar size="sm" src={agency?.logo?.url} />
                  </Box>
               </Flex>
               <Flex alignItems="center" justifyContent="space-between" p="1" w="250px" color="blue.400">
                  {rooms} <FaBed /> | {baths} <FaBath /> |{millify(area)} sqft <BsGridFill />
               </Flex>
               <Box marginTop="2">
                  <Text fontSize="lg" marginBottom="2" fontWeight="bold">
                     {title}
                  </Text>
                  <Text lineHeight="2" color="gray.600">
                     {HTMLReactParser(sanitize(description))}
                  </Text>
               </Box>
               <Flex flexWrap="wrap" textTransform="uppercase" justifyContent="space-between">
                  <Flex justifyContent="space-between" w="400px" borderColor="gray.100" p="3">
                     <Text>Type</Text>
                     <Text fontWeight="bold">{type}</Text>
                  </Flex>
                  <Flex justifyContent="space-between" w="400px" borderColor="gray.100" p="3">
                     <Text>Purpose</Text>
                     <Text fontWeight="bold">{purpose}</Text>
                  </Flex>
                  {furnishingStatus && (
                     <Flex justifyContent="space-between" w="400px" borderColor="gray.100" p="3">
                        <Text>Furnishing Status</Text>
                        <Text fontWeight="bold">{furnishingStatus}</Text>
                     </Flex>
                  )}
               </Flex>
               <Box>
                  {amenities.length > 0 && (
                     <Text fontSize="2xl" fontWeight="black" marginTop="5">
                        Amenities
                     </Text>
                  )}
                  <Flex flexWrap="wrap">
                     {amenities.map((item) =>
                        item.amenities.map((amenity) => (
                           <Text fontWeight="bold" color="blue.400" fontSize="10" p="2" bg="gray.200" m="1" borderRadius="5" key={amenity.text}>
                              {amenity.text}
                           </Text>
                        ))
                     )}
                  </Flex>
               </Box>
            </Box>
         </Box>
      </>
   );
}

export default PropertyDetails;

export const getStaticPaths = async () => {
   return {
      paths: [],
      fallback: 'blocking'
   };
};

export const getStaticProps = async ({ params: { id } }) => {

   try {
      const data = await fetchApi(`${baseUrl}/properties/detail?externalID=${id}`)
      return {
         props: {
            propertyDetails: data,
         },
      };
   } catch (error) {
      return error

   }
};


