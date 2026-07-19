import { createFileRoute } from '@tanstack/react-router'
import { Select, SelectItem } from "@heroui/select"
import { ODD_SEM, type CourseKey } from '@/utils/constants'
import { useEffect, useState } from 'react'
import { Input } from "@heroui/input"
import { Button } from '@heroui/button'
import { Alert } from '@heroui/alert'

export const Route = createFileRoute('/')({ component: App })

interface FormData { course: string, batch: string }
interface FormError { course?: string, batch?: string }

function App() {
  const navigate = Route.useNavigate()

  const [data, setData] = useState<FormData>({ course: '', batch: '' })
  const [error, setError] = useState<FormError>({})

  useEffect(() => {
    const course = localStorage.getItem("course")
    const batch = localStorage.getItem("batch")

    if (!course && !batch) return

    setData((prev) => ({
      course: course ?? prev.course,
      batch: batch ?? prev.batch,
    }))
  }, [])



  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!data.course) {
      setError({ course: 'Course is required' })
      return
    }
    if (!data.batch.trim()) {
      setError({ batch: 'Batch is required' })
      return
    }

    localStorage.setItem("course", data.course.toUpperCase())
    localStorage.setItem("batch", data.batch.toUpperCase())
    navigate({
      to: '/timetable',
      search: {
        course: data.course.toUpperCase() as CourseKey,
        batch: data.batch.toUpperCase(),
      },
    })
  }

  return (
    <form
      onSubmit={handleSubmit}
      className=" w-full px-4 max-w-md bg-background flex flex-col gap-6 " >
      <div className="text-center">
        <h1 className="text-2xl font-semibold">Find Your Timetable</h1>
        <p className="text-sm text-default-500 mt-1">
          Select your course and batch to continue
        </p>
      </div>

      <Select
        label="Course"
        placeholder="Select course"
        selectedKeys={data.course ? [data.course] : []}
        description={error.course}
        onSelectionChange={(keys) => {
          const value = Array.from(keys)[0] as string
          setData((prev) => ({ ...prev, course: value }))
          setError((prev) => ({ ...prev, course: undefined }))
        }}
      >
        {ODD_SEM.map((course) => (
          <SelectItem key={course}>
            {course}
          </SelectItem>
        ))}
      </Select>

      <Input
        label="Batch"
        placeholder="Eg: 23A12, 24A11"
        value={data.batch}
        description={error.batch}
        onChange={(e) =>
          setData((prev) => ({ ...prev, batch: e.target.value }))
        }
      />

      <Button
        type="submit"
        color="primary"
        radius="full"
        className='w-fit mx-auto'
      >
        Get Timetable
      </Button>

      <Alert
        color='primary'
        title="Found a bug?"
        description="Please report it."
      />
    </form>
  )
}
