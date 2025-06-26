'use client';

import React, { useState } from 'react';
import {
    Box,
    Text,
    Heading,
    Container,
    Flex,
    Button,
    Icon,
    GridItem
} from '@chakra-ui/react';
import { BiHappyBeaming } from 'react-icons/bi';
import { FiFrown } from 'react-icons/fi';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Legend } from 'recharts';

const ComparisonPage = () => {
    const [activeTab, setActiveTab] = useState('year-month');
    const [baseMonth, setBaseMonth] = useState('2025年5月');
    const [targetMonth, setTargetMonth] = useState('2025年6月');

    const comparisonData = [
        {
            name: '健康',
            比較年月: 57,
            基準年月: 67
        },
        {
            name: 'モチベーション',
            比較年月: 97,
            基準年月: 38
        },
        {
            name: 'やる気',
            比較年月: 25,
            基準年月: 93
        },
        {
            name: '人間関係',
            比較年月: 57,
            基準年月: 67
        }
    ];

    const months = [
        '2025年1月', '2025年2月', '2025年3月', '2025年4月', 
        '2025年5月', '2025年6月', '2025年7月', '2025年8月'
    ];

    return (
        <Container maxW="container.xl" p={8} m={8} backgroundColor="white" borderRadius="xl">
            <Box mb={8}>
                <Heading size="2xl" color="gray.800" mb={6}>データ比較</Heading>
                
                {/* Tabs */}
                <Flex gap={0} mb={8}>
                    <Button
                        onClick={() => setActiveTab('year-month')}
                        variant={activeTab === 'year-month' ? 'solid' : 'outline'}
                        bg={activeTab === 'year-month' ? 'blue.500' : 'transparent'}
                        color={activeTab === 'year-month' ? 'white' : 'blue.500'}
                        borderColor="blue.500"
                        borderRightRadius={0}
                        borderRight="none"
                        _hover={{
                            bg: activeTab === 'year-month' ? 'blue.600' : 'blue.50'
                        }}
                    >
                        年月比較
                    </Button>
                    <Button
                        onClick={() => setActiveTab('item')}
                        variant={activeTab === 'item' ? 'solid' : 'outline'}
                        bg={activeTab === 'item' ? 'blue.500' : 'transparent'}
                        color={activeTab === 'item' ? 'white' : 'blue.500'}
                        borderColor="blue.500"
                        borderLeftRadius={0}
                        _hover={{
                            bg: activeTab === 'item' ? 'blue.600' : 'blue.50'
                        }}
                    >
                        項目比較
                    </Button>
                </Flex>

                {/* Year-Month Comparison Content */}
                {activeTab === 'year-month' && (
                    <Box>
                        <Heading size="lg" color="gray.800" mb={6}>年月比較</Heading>
                        
                        {/* Date Selectors */}
                        <Flex gap={8} mb={8} align="center">
                            <Flex align="center" gap={3}>
                                <Box w={4} h={4} bg="orange.400" borderRadius="full" />
                                <Text fontWeight="medium">比較年月</Text>
                                <Box>
                                    <select 
                                        value={baseMonth} 
                                        onChange={(e) => setBaseMonth(e.target.value)}
                                        style={{
                                            width: '150px',
                                            padding: '8px 12px',
                                            border: '1px solid #E2E8F0',
                                            borderRadius: '6px',
                                            backgroundColor: 'white',
                                            fontSize: '14px'
                                        }}
                                    >
                                        {months.map(month => (
                                            <option key={month} value={month}>{month}</option>
                                        ))}
                                    </select>
                                </Box>
                            </Flex>
                            
                            <Flex align="center" gap={3}>
                                <Box w={4} h={4} bg="blue.500" borderRadius="full" />
                                <Text fontWeight="medium">基準年月</Text>
                                <Box>
                                    <select 
                                        value={targetMonth} 
                                        onChange={(e) => setTargetMonth(e.target.value)}
                                        style={{
                                            width: '150px',
                                            padding: '8px 12px',
                                            border: '1px solid #E2E8F0',
                                            borderRadius: '6px',
                                            backgroundColor: 'white',
                                            fontSize: '14px'
                                        }}
                                    >
                                        {months.map(month => (
                                            <option key={month} value={month}>{month}</option>
                                        ))}
                                    </select>
                                </Box>
                            </Flex>
                        </Flex>

                        {/* Chart */}
                        <Box h="400px" mb={8}>
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={comparisonData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                                    <XAxis 
                                        dataKey="name" 
                                        axisLine={false}
                                        tickLine={false}
                                    />
                                    <YAxis 
                                        axisLine={false}
                                        tickLine={false}
                                        domain={[0, 100]}
                                    />
                                    <Legend />
                                    <Bar 
                                        dataKey="比較年月" 
                                        fill="#FB923C" 
                                        name="比較年月"
                                        radius={[4, 4, 0, 0]}
                                    />
                                    <Bar 
                                        dataKey="基準年月" 
                                        fill="#3B82F6" 
                                        name="基準年月"
                                        radius={[4, 4, 0, 0]}
                                    />
                                </BarChart>
                            </ResponsiveContainer>
                        </Box>

                        {/* AI Analysis Section */}
                        <Box mb={8}>
                            <Heading size="lg" color="gray.800" mb={4}>
                                基準データについて、AIによる分析・考察
                            </Heading>

                            {/* Good Points */}
                            <GridItem mb={6}>
                                <Heading size="md" color="rgb(56, 161, 105)" mb={4}>
                                    <Icon color="rgb(56, 161, 105)" mr={2} mb={1}>
                                        <BiHappyBeaming size={20} />
                                    </Icon>
                                    良い点
                                </Heading>
                                <Text lineHeight="tall" color="gray.700">
                                    比較年月当時のスコアと比較すると、健康・やる気・人間関係についてのスコアが上昇しています。
                                    特に「中期経営計画」というワードが頻繁に見られることから、経営層のみなさまの想いが従業員のみなさまに届いたのではないかと考えられます。
                                    その中でも特に「〇〇」という施策に対するポジティブな意見が多く見られたことあり、この施策を強く推進していくことで、エンゲージメントの向上に繋がることが考えられます。
                                </Text>
                            </GridItem>

                            {/* Improvement Points */}
                            <GridItem>
                                <Heading size="md" color="rgb(229, 62, 62)" mb={4}>
                                    <Icon color="rgb(229, 62, 62)" mr={2} mb={1}>
                                        <FiFrown size={20} />
                                    </Icon>
                                    改善点
                                </Heading>
                                <Text lineHeight="tall" color="gray.700">
                                    比較年月当時のスコアと比較すると、モチベーションについてのスコアが下降しています。
                                    xxxx.....
                                </Text>
                            </GridItem>
                        </Box>
                    </Box>
                )}

                {/* Item Comparison Content (placeholder) */}
                {activeTab === 'item' && (
                    <Box>
                        <Heading size="lg" color="gray.800" mb={6}>項目比較</Heading>
                        <Text color="gray.600">項目比較の内容がここに表示されます。</Text>
                    </Box>
                )}
            </Box>
        </Container>
    );
};

export default ComparisonPage;