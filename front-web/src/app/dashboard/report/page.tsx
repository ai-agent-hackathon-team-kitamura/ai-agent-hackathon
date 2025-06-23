'use client';

import React from 'react';
import {
    Box,
    Text,
    Heading,
    GridItem,
    Container,
    Stack,
    Progress,
    Icon
} from '@chakra-ui/react';
import { BiHappyBeaming } from 'react-icons/bi';
import { FiFrown } from 'react-icons/fi';
import { useSummeryQuery } from '@/store/api';

const Dashboard = () => {
    const textColor = 'gray.800';
    const mutedColor = 'gray.600';
    const { data, error, isLoading } = useSummeryQuery();

    return (
        <Container maxW="container.xl" p={8} m={8} backgroundColor="white" borderRadius="xl">
            <Box mb={8}>
                <Heading size="2xl" color={textColor} mb={2}>最新レポート</Heading>
            </Box>

            {/* Health Section */}
            <Heading size="xl" color={textColor}>健康</Heading>
            <Text color={mutedColor}>従業員のみなさまの身体・ココロの健康についてのデータです。</Text>

            <Progress.Root value={94} size="lg" colorPalette="blue" mb={6}>
                {/* <Progress.Track height="42px"> */}
                {/* <Progress.Range bg="rgb(49, 130, 206)" /> */}
                {/* </Progress.Track> */}
                <Progress.Label />
            </Progress.Root>

            <Box h="80" mb={6}>
                <Stack gap={4}>
                    <Text color={mutedColor} lineHeight="tall">
                        比較年月当時のスコアと比較すると、健康・やる気・人間関係についてのスコアが上昇しています。
                        特に「中期経営計画」というワードが頻繁に見られることから、経営層のみなさまの想いが従業員のみなさまに届いたのではないかと考えられます。
                    </Text>
                    <Text color={mutedColor} lineHeight="tall">
                        その中でも特に「〇〇」という施策に対するポジティブな意見が多く見られたことあり、この施策を強く推進していくことで、エンゲージメントの向上に繋がることが考えられます。
                    </Text>
                </Stack>
            </Box>

            {/* Good Points */}
            <GridItem>
                <Heading size="md" color="rgb(56, 161, 105)" my={4}>
                    <Icon color="rgb(56, 161, 105)" mr={2} mb={1}>
                        <BiHappyBeaming size={20} />
                    </Icon>
                    良い点
                </Heading>
                <Text color={mutedColor} lineHeight="tall">
                    {data?.good_point || "良い点のデータがありません。"}
                </Text>
            </GridItem>

            <GridItem>
                <Heading size="md" color="rgb(229, 62, 62)" my={4}>
                    <Icon color="rgb(229, 62, 62)" mr={2} mb={1}>
                        <FiFrown size={20} />
                    </Icon>
                    悪い点
                </Heading>
                <Text color={mutedColor} lineHeight="tall">
                    {data?.bad_point || "悪い点のデータがありません。"}
                </Text>
            </GridItem>
        </Container>
    );
};

export default Dashboard;