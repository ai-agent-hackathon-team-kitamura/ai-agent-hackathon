'use client';

import React from 'react';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { CheckCircle, AlertCircle, Users, Heart, Brain, Target } from 'lucide-react';
import {
    Box,
    Flex,
    Text,
    Heading,
    Grid,
    GridItem,
    Container,
    Stack
} from '@chakra-ui/react';

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
        <Container maxW="container.xl" p={8} my={8} backgroundColor="white" borderRadius="xl">
            <Box mb={8}>
                <Heading size="2xl" color={textColor} mb={2}>最新レポート</Heading>
                <Text color={mutedColor}>従業員のみなさまの身体・ココロの健康についてのデータです。</Text>
            </Box>

            {/* Health Section */}
            <Box bg={cardBg} borderRadius="xl" shadow="lg" p={6} mb={8}>
                <Flex alignItems="center" gap={3} mb={6}>
                    <Heart color="red.500" size={28} />
                    <Heading size="xl" color={textColor}>健康</Heading>
                </Flex>
                <Box h="80" mb={6}>
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={healthData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                            <XAxis dataKey="name" stroke="#666" />
                            <YAxis stroke="#666" />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: '#f8fafc',
                                    border: '1px solid #e2e8f0',
                                    borderRadius: '8px'
                                }}
                            />
                            <Line
                                type="monotone"
                                dataKey="健康"
                                stroke="#10B981"
                                strokeWidth={3}
                                dot={{ fill: '#10B981', strokeWidth: 2, r: 5 }}
                            />
                            <Line
                                type="monotone"
                                dataKey="やる気"
                                stroke="#3B82F6"
                                strokeWidth={3}
                                dot={{ fill: '#3B82F6', strokeWidth: 2, r: 5 }}
                            />
                            <Line
                                type="monotone"
                                dataKey="人間関係"
                                stroke="#8B5CF6"
                                strokeWidth={3}
                                dot={{ fill: '#8B5CF6', strokeWidth: 2, r: 5 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </Box>

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
            <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={6} mb={8}>
                <GridItem>
                    <Box
                        bg="green.50"
                        borderColor="green.200"
                        borderWidth={1}
                        borderRadius="xl"
                        p={6}
                        shadow="sm"
                    >
                        <Flex alignItems="center" gap={3} mb={4}>
                            <CheckCircle color="green.600" size={24} />
                            <Heading size="md" color="green.800">良い点</Heading>
                        </Flex>
                        <Text color="green.700" lineHeight="tall">
                            比較年月当時のスコアと比較すると、健康・やる気・人間関係についてのスコアが上昇しています。
                            特に「中期経営計画」というワードが頻繁に見られることから、経営層のみなさまの想いが従業員のみなさまに届いたのではないかと考えられます。
                            その中でも特に「〇〇」という施策に対するポジティブな意見が多く見られたことあり、この施策を強く推進していくことで、エンゲージメントの向上に繋がることが考えられます。
                        </Text>
                    </Box>
                </GridItem>

                <GridItem>
                    <Box
                        bg="red.50"
                        borderColor="red.200"
                        borderWidth={1}
                        borderRadius="xl"
                        p={6}
                        shadow="sm"
                    >
                        <Flex alignItems="center" gap={3} mb={4}>
                            <AlertCircle color="red.600" size={24} />
                            <Heading size="md" color="red.800">改善点</Heading>
                        </Flex>
                        <Text color="red.700" lineHeight="tall">
                            比較年月当時のスコアと比較すると、モチベーションについてのスコアが下降しています。
                            xxxx.....
                        </Text>
                    </Box>
                </GridItem>
            </Grid>

            {/* Statistics Cards */}
            <Grid templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }} gap={6} mb={8}>
                <GridItem>
                    <Box bg={cardBg} borderRadius="xl" shadow="lg" p={6}>
                        <Flex justify="space-between" align="start" mb={4}>
                            <Flex alignItems="center" gap={3}>
                                <Users color="blue.600" size={24} />
                                <Text fontWeight="semibold" color={textColor}>総従業員数</Text>
                            </Flex>
                            <Text color="blue.600" fontSize="2xl" fontWeight="bold">247</Text>
                        </Flex>
                        <Text fontSize="sm" color={mutedColor}>前月比 +3.2%</Text>
                    </Box>
                </GridItem>

                <GridItem>
                    <Box bg={cardBg} borderRadius="xl" shadow="lg" p={6}>
                        <Flex justify="space-between" align="start" mb={4}>
                            <Flex alignItems="center" gap={3}>
                                <Heart color="red.500" size={24} />
                                <Text fontWeight="semibold" color={textColor}>健康スコア</Text>
                            </Flex>
                            <Text color="red.500" fontSize="2xl" fontWeight="bold">94</Text>
                        </Flex>
                        <Text fontSize="sm" color={mutedColor}>前月比 +4.2%</Text>
                    </Box>
                </GridItem>

                <GridItem>
                    <Box bg={cardBg} borderRadius="xl" shadow="lg" p={6}>
                        <Flex justify="space-between" align="start" mb={4}>
                            <Flex alignItems="center" gap={3}>
                                <Target color="green.600" size={24} />
                                <Text fontWeight="semibold" color={textColor}>エンゲージメント</Text>
                            </Flex>
                            <Text color="green.600" fontSize="2xl" fontWeight="bold">89</Text>
                        </Flex>
                        <Text fontSize="sm" color={mutedColor}>前月比 +2.1%</Text>
                    </Box>
                </GridItem>
            </Grid>

            {/* Motivation Distribution */}
            <Box bg={cardBg} borderRadius="xl" shadow="lg" p={6}>
                <Flex alignItems="center" gap={3} mb={6}>
                    <Brain color="purple.600" size={28} />
                    <Heading size="xl" color={textColor}>モチベーション分布</Heading>
                </Flex>
                <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={8}>
                    <GridItem>
                        <Box h="64">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={motivationData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={100}
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        {motivationData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip formatter={(value) => [`${value}%`, 'パーセンテージ']} />
                                </PieChart>
                            </ResponsiveContainer>
                        </Box>
                    </GridItem>

                    <GridItem>
                        <Stack gap={4} justify="center" h="full">
                            {motivationData.map((item, index) => (
                                <Flex key={index} alignItems="center" gap={3} w="full">
                                    <Box
                                        w={4}
                                        h={4}
                                        borderRadius="full"
                                        bg={item.color}
                                    />
                                    <Text flex={1} color={mutedColor}>{item.name}</Text>
                                    <Text fontWeight="bold" color={textColor}>{item.value}%</Text>
                                </Flex>
                            ))}
                        </Stack>
                    </GridItem>
                </Grid>
            </Box>
        </Container>
    );
};

export default Dashboard;