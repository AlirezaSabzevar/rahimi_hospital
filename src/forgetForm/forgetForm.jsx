import './forgetForm.css';
import { Formik, Form, Field } from "formik";
import * as Yup from 'yup';
import { Input, Button, Card, Typography, message } from "antd";
import { MailOutlined } from "@ant-design/icons";
import { useState } from "react";

function ForgetForm() {
    
    const [submitted, setSubmitted] = useState(false);

    const {Title, Text} = Typography;

    const validationSchema = Yup.object({
        email : Yup.string().email('لطفا ایمیل معتبر وارد کنید').required('ایمیل الزامی است'),
    });

    return ( 
        <div className="forget-container">
            <Card className='Card'>
                <Title level={3}>فراموشی کلمه عبور</Title>
                <Text type="secondary">ایمیل خود را وارد کنید تا لینک بازیابی کلمه عبور برای شما ارسال گردد
                </Text>
                <Formik
                    initialValues={{email:''}}
                    validationSchema={validationSchema}
                    onSubmit={(values, {setSubmitting})=>{
                        setTimeout(()=>{
                            message.success('لینک بازیابی کلمه عبور ارسال شد');
                            setSubmitted(true);
                            setSubmitting(false);
                        }, 1500);
                    }}
                >
                    {({errors, touched, isSubmitting})=>(
                        <Form className='Form'>
                            <Field name='email'>
                                {({field})=>(
                                    <Input {...field} prefix={<MailOutlined />} placeholder="ایمیل" size="large" status={errors.email && touched.email ? "error" : ""} />
                                )}
                            </Field>
                            {errors.email && touched.email && <Text type="danger">{errors.email}</Text>}
                            <Button className='Button' type="primary" htmlType="submit" block size="large" loading={isSubmitting}>
                                ارسال لینک بازیابی
                            </Button>
                        </Form>
                    )}
                </Formik>
                {submitted && <Text type="success" className='Text'>اگر ایمیل شما در سیستم موجود باشد، لینک بازیابی ارسال خواهد شد</Text>}
            </Card>
        </div>
    );
};

export default ForgetForm;