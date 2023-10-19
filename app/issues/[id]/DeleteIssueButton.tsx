'use client'

import { useState } from 'react'

import axios from 'axios'
import { useRouter } from 'next/navigation'

import { AlertDialog, Button, Flex } from '@radix-ui/themes'

const DeleteIssueButton = ({ issueId }: { issueId: number }) => {
    const router = useRouter()
    const [error, setError] = useState(false)

    const deleteIssue = async () => {
        try {
            await axios.delete('/api/issues/' + issueId)
            router.push('/issues')
            router.refresh()
        } catch (error) {
            setError(true)
        }
    }

    return (
        <>
            <AlertDialog.Root>
                <AlertDialog.Trigger>
                    <Button color="red">Delete Issue</Button>
                </AlertDialog.Trigger>
                <AlertDialog.Content>
                    <AlertDialog.Title>Confirm Deletion</AlertDialog.Title>
                    <AlertDialog.Description>
                        Are you sur eyou want to delete this issue? this action
                        cannot be undone
                    </AlertDialog.Description>
                    <Flex mt="4" gap="3">
                        <AlertDialog.Cancel>
                            <Button variant="soft" color="gray">
                                Cancel
                            </Button>
                        </AlertDialog.Cancel>
                        <AlertDialog.Action>
                            <Button color="red" onClick={deleteIssue}>
                                Delete Issue
                            </Button>
                        </AlertDialog.Action>
                    </Flex>
                </AlertDialog.Content>
            </AlertDialog.Root>
            <AlertDialog.Root open={error}>
                <AlertDialog.Content>
                    <AlertDialog.Title>Error</AlertDialog.Title>
                    <AlertDialog.Description>
                        This issue cannot be deleted
                    </AlertDialog.Description>
                    <Button
                        mt="2"
                        color="gray"
                        variant="soft"
                        onClick={() => setError(false)}
                    >
                        OK
                    </Button>
                </AlertDialog.Content>
            </AlertDialog.Root>
        </>
    )
}

export default DeleteIssueButton
