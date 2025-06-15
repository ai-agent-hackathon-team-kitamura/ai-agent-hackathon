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

const Dashboard = () => {
    // Sample data for charts
    const healthData = [
        { name: '1月', 健康: 85, やる気: 78, 人間関係: 82 },
        { name: '2月', 健康: 87, やる気: 80, 人間関係: 85 },
        { name: '3月', 健康: 89, やる気: 85, 人間関係: 88 },
        { name: '4月', 健康: 92, やる気: 88, 人間関係: 90 },
        { name: '5月', 健康: 90, やる気: 92, 人間関係: 87 },
        { name: '6月', 健康: 94, やる気: 89, 人間関係: 92 }
    ];

    const motivationData = [
        { name: '非常に高い', value: 25, color: '#10B981' },
        { name: '高い', value: 45, color: '#3B82F6' },
        { name: '普通', value: 20, color: '#F59E0B' },
        { name: '低い', value: 10, color: '#EF4444' }
    ];

    const cardBg = 'white';
    const textColor = 'gray.800';
    const mutedColor = 'gray.600';

    return (
        <Container maxW="container.xl" p={8} m={8} backgroundColor="white" borderRadius="xl">
            <Box mb={8}>
                <Heading size="2xl" color={textColor} mb={2}>最新レポート</Heading>
            </Box>

            {/* Health Section */}
            <Heading size="xl" color={textColor}>健康</Heading>
            <Text color={mutedColor}>従業員のみなさまの身体・ココロの健康についてのデータです。</Text>

            <Progress.Root value={94} size="lg" colorPalette="blue" mb={6}>
                <Progress.Track height="42px">
                    <Progress.Range bg="rgb(49, 130, 206)" />
                </Progress.Track>
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
                <Text lineHeight="tall">
                    比較年月当時のスコアと比較すると、健康・やる気・人間関係についてのスコアが上昇しています。
                    特に「中期経営計画」というワードが頻繁に見られることから、経営層のみなさまの想いが従業員のみなさまに届いたのではないかと考えられます。
                    その中でも特に「〇〇」という施策に対するポジティブな意見が多く見られたことあり、この施策を強く推進していくことで、エンゲージメントの向上に繋がることが考えられます。
                </Text>
            </GridItem>

            <GridItem>
                <Heading size="md" color="rgb(229, 62, 62)" my={4}>
                    <Icon color="rgb(229, 62, 62)" mr={2} mb={1}>
                        <FiFrown size={20} />
                    </Icon>
                    改善点
                </Heading>
                <Text lineHeight="tall">
                    比較年月当時のスコアと比較すると、モチベーションについてのスコアが下降しています。
                    xxxx.....
                </Text>
            </GridItem>
        </Container>
    );
};

export default Dashboard;