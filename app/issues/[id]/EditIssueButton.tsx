import React from 'react'

import Link from 'next/link'

import { Pencil2Icon } from '@radix-ui/react-icons'
import { Button } from '@radix-ui/themes'

interface Props {
    issueId: number
}

const EditIssueButton = ({ issueId }: Props) => {
    return (
        <Button>
            <Pencil2Icon />
            <Link href={`/issues/edit/${issueId}`}>Edit Issue</Link>
        </Button>
    )
}

export default EditIssueButton
