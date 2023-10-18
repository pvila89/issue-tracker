'use client'

import 'easymde/dist/easymde.min.css';

import { useState } from 'react';

import axios from 'axios';
import { useRouter } from 'next/navigation';
import {
  Controller,
  useForm,
} from 'react-hook-form';
import SimpleMDE from 'react-simplemde-editor';
import { z } from 'zod';

import ErrorMessage from '@/app/components/ErrorMessage';
import { createIssueSchema } from '@/app/validationSchemas';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Button,
  Callout,
  TextField,
} from '@radix-ui/themes';

type IssueForm = z.infer<typeof createIssueSchema>

const NewIssuePage = () => {
    const router = useRouter()
    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<IssueForm>({
        resolver: zodResolver(createIssueSchema),
    })
    const [error, setError] = useState('')

    return (
        <div className="max-w-xl">
            {error && (
                <Callout.Root color="red" className="mb-5">
                    <Callout.Text>{error}</Callout.Text>
                </Callout.Root>
            )}
            <form
                className="space-y-3"
                onSubmit={handleSubmit(async (data) => {
                    try {
                        await axios.post('/api/issues', data)
                        router.push('/issues')
                    } catch (error) {
                        setError('An unexpected error ocurred')
                    }
                })}
            >
                <TextField.Root>
                    <TextField.Input
                        placeholder="Title"
                        {...register('title')}
                    />
                </TextField.Root>
                <ErrorMessage>{errors.title?.message}</ErrorMessage>

                <Controller
                    name="description"
                    control={control}
                    render={({ field }) => (
                        <SimpleMDE placeholder="Description" {...field} />
                    )}
                />
                <ErrorMessage>{errors.description?.message}</ErrorMessage>

                <Button>Submit New Issue</Button>
            </form>
        </div>
    )
}

export default NewIssuePage
