import React from 'react'

import Link from 'next/link'
import NextLink from 'next/link'

import { IssueStatusBadge } from '@/app/components'
import { Issue, Status } from '@prisma/client'
import { ArrowDownIcon, ArrowUpIcon } from '@radix-ui/react-icons'
import { Table, TableColumnHeaderCell } from '@radix-ui/themes'

interface Props {
    searchParams: IssueQuery
    issues: Issue[]
}

const IssueTable = ({ searchParams, issues }: Props) => {
    return (
        <Table.Root variant="surface">
            <Table.Header>
                <Table.Row>
                    {columns.map((column) => (
                        <TableColumnHeaderCell
                            key={column.value}
                            className={column.className}
                        >
                            <NextLink
                                href={{
                                    query: {
                                        ...searchParams,
                                        orderBy: column.value,
                                        orderDirection:
                                            column.value ===
                                                searchParams.orderBy &&
                                            searchParams.orderDirection ===
                                                'asc'
                                                ? 'desc'
                                                : 'asc',
                                    },
                                }}
                            >
                                {column.label}
                            </NextLink>
                            {column.value === searchParams.orderBy &&
                                searchParams.orderDirection === 'asc' && (
                                    <ArrowUpIcon className="inline" />
                                )}
                            {column.value === searchParams.orderBy &&
                                searchParams.orderDirection === 'desc' && (
                                    <ArrowDownIcon className="inline" />
                                )}
                        </TableColumnHeaderCell>
                    ))}
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {issues.map((issue) => (
                    <Table.Row key={issue.id}>
                        <Table.Cell>
                            <Link href={`/issues/${issue.id}`}>
                                {issue.title}
                            </Link>
                            <div className="block md:hidden">
                                <IssueStatusBadge status={issue.status} />
                            </div>
                        </Table.Cell>
                        <Table.Cell className="hidden md:table-cell">
                            <IssueStatusBadge status={issue.status} />
                        </Table.Cell>
                        <Table.Cell className="hidden md:table-cell">
                            {issue.createdAt.toDateString()}
                        </Table.Cell>
                    </Table.Row>
                ))}
            </Table.Body>
        </Table.Root>
    )
}

const columns: { label: string; value: keyof Issue; className?: string }[] = [
    { label: 'Issue', value: 'title' },
    {
        label: 'Status',
        value: 'status',
        className: 'hidden md:table-cell',
    },
    {
        label: 'Created',
        value: 'createdAt',
        className: 'hidden md:table-cell',
    },
]

export interface IssueQuery {
    status: Status
    orderBy: keyof Issue
    orderDirection: 'asc' | 'desc'
    page: string
}

export const columnNames = columns.map((column) => column.value)

export default IssueTable
