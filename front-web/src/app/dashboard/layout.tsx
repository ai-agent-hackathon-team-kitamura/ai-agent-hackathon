'use client';

import React, { useState } from 'react';
import { BarChart, TrendingUp } from 'lucide-react';
import {
    Box,
    Flex,
    Text,
    Heading,
    Button,
    Stack,
} from '@chakra-ui/react';

interface DashboardLayoutProps {
    children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
    const [activeTab, setActiveTab] = useState('latest-report');

    const MenuItems = [
        { id: 'latest-report', label: '最新レポート', icon: TrendingUp },
        { id: 'data-comparison', label: 'データ比較', icon: BarChart }
    ];

    const sidebarBg = 'blue.600';
    const bgColor = 'gray.50';

    return (
        <Flex minH="100vh" bg={bgColor}>
            {/* Sidebar */}
            <Box
                w="64"
                bgGradient={`linear(to-b, ${sidebarBg}, blue.800)`}
                color="white"
                shadow="lg"
                position="relative"
                backgroundColor="#3182CE"
            >
                <Box p={6}>
                    <Heading size="lg" mb={8}>経営ダッシュボード</Heading>
                    <Stack gap={2} align="stretch">
                        {MenuItems.map((item) => {
                            const Icon = item.icon;
                            return (
                                <Button
                                    key={item.id}
                                    onClick={() => setActiveTab(item.id)}
                                    variant={activeTab === item.id ? 'solid' : 'ghost'}
                                    bg={activeTab === item.id ? 'white' : 'transparent'}
                                    color={activeTab === item.id ? 'blue.600' : 'blue.100'}
                                    _hover={{
                                        bg: activeTab === item.id ? 'white' : 'blue.700',
                                        color: activeTab === item.id ? 'blue.600' : 'white'
                                    }}
                                    justifyContent="flex-start"
                                    fontWeight="medium"
                                    borderRadius="lg"
                                    transition="all 0.2s"
                                    shadow={activeTab === item.id ? 'md' : 'none'}
                                >
                                    <Icon size={20} style={{ marginRight: '8px' }} />
                                    {item.label}
                                </Button>
                            );
                        })}
                    </Stack>
                </Box>

                {/* User Profile */}
                <Box
                    position="absolute"
                    bottom={0}
                    left={0}
                    right={0}
                    p={6}
                    borderTop="1px"
                    borderColor="blue.500"
                >
                    <Flex alignItems="center" gap={3}>
                        <Box
                            w="40px"
                            h="40px"
                            bg="blue.400"
                            borderRadius="full"
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            color="white"
                            fontWeight="semibold"
                        >
                            利
                        </Box>
                        <Stack gap={0}>
                            <Text fontWeight="medium" fontSize="sm">利用者 太郎</Text>
                            <Text fontSize="xs" color="blue.200">管理者</Text>
                        </Stack>
                    </Flex>
                </Box>
            </Box>

            {/* Main Content */}
            <Box flex={1} overflowY="auto" backgroundColor="#EBF8FF">
                {children}
            </Box>
        </Flex>
    );
}