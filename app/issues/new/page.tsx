'use client'

import 'easymde/dist/easymde.min.css';

import axios from 'axios';
import { useRouter } from 'next/navigation';
import {
  Controller,
  useForm,
} from 'react-hook-form';
import SimpleMdeReact from 'react-simplemde-editor';

import {
  Button,
  TextField,
} from '@radix-ui/themes';

interface IssueForm {
    title: string
    description: string
}

const NewIssuePage = () => {
    const router = useRouter()
    const { register, control, handleSubmit } = useForm<IssueForm>()

    return (
        <form
            className="max-w-xl space-y-3"
            onSubmit={handleSubmit(async (data) => {
                await axios.post('/api/issues', data)
                router.push('/issues')
            })}
        >
            <TextField.Root>
                <TextField.Input placeholder="Title" {...register('title')} />
            </TextField.Root>
            <Controller
                name="description"
                control={control}
                render={({ field }) => (
                    <SimpleMdeReact placeholder="Description" {...field} />
                )}
            />

            <Button>Submit New Issue</Button>
        </form>
    )
}

export default NewIssuePage
