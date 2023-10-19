'use client'

import 'easymde/dist/easymde.min.css'

import { useState } from 'react'

import axios from 'axios'
import { useRouter } from 'next/navigation'
import { Controller, useForm } from 'react-hook-form'
import SimpleMDE from 'react-simplemde-editor'
import { z } from 'zod'

import ErrorMessage from '@/app/components/ErrorMessage'
import Spinner from '@/app/components/Spinner'
import { IssueSchema } from '@/app/validationSchemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { Issue } from '@prisma/client'
import { Button, Callout, TextField } from '@radix-ui/themes'

type IssueFormData = z.infer<typeof IssueSchema>

interface Props {
    issue?: Issue
}

const IssueForm = ({ issue }: Props) => {
    const router = useRouter()
    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<IssueFormData>({
        resolver: zodResolver(IssueSchema),
    })
    const [error, setError] = useState('')
    const [isSubmitting, setSubmitting] = useState(false)

    const onSubmit = handleSubmit(async (data) => {
        try {
            setSubmitting(true)
            if (issue) await axios.patch('/api/issues/' + issue.id, data)
            else await axios.post('/api/issues', data)

            router.push('/issues')
            router.refresh()
        } catch (error) {
            setSubmitting(false)
            setError('An unexpected error ocurred')
        }
    })

    return (
        <div className="max-w-xl">
            {error && (
                <Callout.Root color="red" className="mb-5">
                    <Callout.Text>{error}</Callout.Text>
                </Callout.Root>
            )}
            <form className="space-y-3" onSubmit={onSubmit}>
                <TextField.Root>
                    <TextField.Input
                        defaultValue={issue?.title}
                        placeholder="Title"
                        {...register('title')}
                    />
                </TextField.Root>
                <ErrorMessage>{errors.title?.message}</ErrorMessage>

                <Controller
                    name="description"
                    control={control}
                    defaultValue={issue?.description}
                    render={({ field }) => (
                        <SimpleMDE placeholder="Description" {...field} />
                    )}
                />
                <ErrorMessage>{errors.description?.message}</ErrorMessage>

                <Button disabled={isSubmitting}>
                    {issue ? 'Update Issue' : 'Submit New Issue'}{' '}
                    {isSubmitting && <Spinner />}
                </Button>
            </form>
        </div>
    )
}

export default IssueForm
