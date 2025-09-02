import React, { useEffect, useMemo, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  VStack,
  HStack,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
  Button,
  useToast,
} from "@chakra-ui/react";
import { useMeetings } from "../../../_api/hooks/useMeetings";

type MeetingType = "LESSON" | "EXAM" | "EVENT";

interface MeetingFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultDate?: Date; // suggested date for dateBegin
}

export const MeetingFormModal: React.FC<MeetingFormModalProps> = ({ isOpen, onClose, defaultDate }) => {
  const toast = useToast();
  const { create } = useMeetings();

  // Build default date-time-local string
  const defaultDateTimeLocal = useMemo(() => {
    const d = defaultDate ? new Date(defaultDate) : new Date();
    // default 09:00
    d.setHours(9, 0, 0, 0);
    const pad = (n: number) => `${n}`.padStart(2, "0");
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
  }, [defaultDate]);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [type, setType] = useState<MeetingType>("LESSON");
  const [dateBegin, setDateBegin] = useState(defaultDateTimeLocal);
  const [durationMinutes, setDurationMinutes] = useState<number>(45);
  const [curatorId, setCuratorId] = useState<string>("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setDateBegin(defaultDateTimeLocal);
      setTitle("");
      setContent("");
      setType("LESSON");
      setDurationMinutes(45);
      setCuratorId("");
    }
  }, [isOpen, defaultDateTimeLocal]);

  const submit = async () => {
    if (!title || !dateBegin) {
      toast({ title: "Заполните обязательные поля", status: "error" });
      return;
    }
    setLoading(true);
    try {
      const durationMs = String(durationMinutes * 60 * 1000);
      await create.mutateAsync({
        title,
        content,
        type,
        dateBegin: new Date(dateBegin).toISOString(),
        duration: durationMs,
        curatorId: curatorId || "00000000-0000-0000-0000-000000000000",
      } as any);
      toast({ title: "Занятие создано", status: "success" });
      onClose();
    } catch (e: any) {
      toast({ title: "Ошибка создания", description: e?.message || "Ошибка", status: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Добавить занятие</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <VStack spacing={4} align="stretch">
            <FormControl isRequired>
              <FormLabel>Название</FormLabel>
              <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Алгебра" />
            </FormControl>
            <FormControl>
              <FormLabel>Описание</FormLabel>
              <Textarea value={content} onChange={(e) => setContent(e.target.value)} rows={3} />
            </FormControl>
            <HStack>
              <FormControl isRequired>
                <FormLabel>Тип</FormLabel>
                <Select value={type} onChange={(e) => setType(e.target.value as MeetingType)}>
                  <option value="LESSON">Урок</option>
                  <option value="EXAM">Экзамен</option>
                  <option value="EVENT">Событие</option>
                </Select>
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Начало</FormLabel>
                <Input type="datetime-local" value={dateBegin} onChange={(e) => setDateBegin(e.target.value)} />
              </FormControl>
            </HStack>
            <HStack>
              <FormControl isRequired>
                <FormLabel>Длительность (мин)</FormLabel>
                <Input type="number" min={1} value={durationMinutes} onChange={(e) => setDurationMinutes(Number(e.target.value))} />
              </FormControl>
              <FormControl>
                <FormLabel>Curator ID</FormLabel>
                <Input value={curatorId} onChange={(e) => setCuratorId(e.target.value)} placeholder="UUID преподавателя" />
              </FormControl>
            </HStack>
            <HStack justify="flex-end" pt={2}>
              <Button onClick={onClose} variant="outline">Отмена</Button>
              <Button colorScheme="blue" onClick={submit} isLoading={loading}>Создать</Button>
            </HStack>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

