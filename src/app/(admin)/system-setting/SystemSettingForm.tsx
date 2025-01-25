"use client";

import { Button, Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, Input, Label } from '@/components/ui';
import React, { useState } from 'react'

export function SystemSettingForm() {

    // 폼 데이터 상태 관리
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
    });

    // 입력 필드 변경 핸들러
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: value,
        }));
    };

    // 폼 제출 핸들러
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            // POST 요청 보내기
            const response = await fetch('/api/submitForm', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const result = await response.json();
                alert(result.message); // 성공 메시지 표시
                console.log('Server response:', result);
            } else {
                throw new Error('Form submission failed');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('Form submission failed. Please try again.');
        }
    };


    return (
        <Card className="w-full max-w-2xl">
            <CardHeader>
                <CardTitle>사용자 정보 입력</CardTitle>
                <CardDescription>사용자 정보를 입력해주세요.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
                {/* 이름 입력 필드 */}
                <div className="flex items-center gap-4 p-4 bg-blue-100 rounded-lg">
                    <Label htmlFor="firstName" className="w-20 text-right">
                        이름:
                    </Label>
                    <Input
                        id="firstName"
                        placeholder="이름을 입력하세요"
                        value={formData.firstName}
                        onChange={handleChange}
                        className="flex-1 bg-white"
                    />
                </div>

                {/* 성 입력 필드 */}
                <div className="flex items-center gap-4 p-4 bg-gray-100 rounded-lg">
                    <Label htmlFor="lastName" className="w-20 text-right">
                        성:
                    </Label>
                    <Input
                        id="lastName"
                        placeholder="성을 입력하세요"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="flex-1 bg-white"
                    />
                </div>

                {/* 이메일 입력 필드 */}
                <div className="flex items-center gap-4 p-4 bg-gray-100 rounded-lg">
                    <Label htmlFor="email" className="w-20 text-right">
                        이메일:
                    </Label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="이메일을 입력하세요"
                        value={formData.email}
                        onChange={handleChange}
                        className="flex-1 bg-white"
                    />
                </div>

                {/* 전화번호 입력 필드 */}
                <div className="flex items-center gap-4 p-4 bg-gray-100 rounded-lg">
                    <Label htmlFor="phone" className="w-20 text-right">
                        전화번호:
                    </Label>
                    <Input
                        id="phone"
                        type="tel"
                        placeholder="전화번호를 입력하세요"
                        value={formData.phone}
                        onChange={handleChange}
                        className="flex-1 bg-white"
                    />
                </div>

                {/* 주소 입력 필드 */}
                <div className="flex items-center gap-4 p-4 bg-gray-100 rounded-lg">
                    <Label htmlFor="address" className="w-20 text-right">
                        주소:
                    </Label>
                    <Input
                        id="address"
                        placeholder="주소를 입력하세요"
                        value={formData.address}
                        onChange={handleChange}
                        className="flex-1 bg-white"
                    />
                </div>
            </CardContent>
            <CardFooter className="flex justify-end">
                <Button onClick={handleSubmit}>저장</Button>
            </CardFooter>
        </Card>
    );
}
