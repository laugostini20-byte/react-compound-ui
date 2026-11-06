import { useState, type ReactNode } from 'react';
import { Accordion } from '../Accordion';
import { Dialog } from '../Dialog';
import './HelpDialog.css';

export interface HelpTopic {
  id: string;
  question: string;
  answer: ReactNode;
}

export interface HelpDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: ReactNode;
  /** Questions and answers listed in the dialog. */
  topics: HelpTopic[];
  /** Extra content under the topics, such as a contact link. */
  footer?: ReactNode;
}

/** A searchable help center in a dialog: a filter box over an accordion of topics. */
export function HelpDialog({ open, onOpenChange, title = 'Help', topics, footer }: HelpDialogProps) {
  const [query, setQuery] = useState('');
  const q = query.trim().toLowerCase();
  const matches = q ? topics.filter((t) => t.question.toLowerCase().includes(q)) : topics;
  return (
    <Dialog open={open} onOpenChange={onOpenChange} size="md">
      <Dialog.Header>
        <Dialog.Title>{title}</Dialog.Title>
      </Dialog.Header>
      <Dialog.Body>
        <input
          type="search"
          className="rcu-control rcu-help-dialog__search"
          placeholder="Search help topics"
          aria-label="Search help topics"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        {matches.length > 0 ? (
          <Accordion className="rcu-help-dialog__topics">
            {matches.map((topic) => (
              <Accordion.Item key={topic.id} value={topic.id}>
                <Accordion.Trigger>{topic.question}</Accordion.Trigger>
                <Accordion.Content>{topic.answer}</Accordion.Content>
              </Accordion.Item>
            ))}
          </Accordion>
        ) : (
          <p className="rcu-help-dialog__empty">No topics match “{query}”.</p>
        )}
        {footer && <div className="rcu-help-dialog__footer">{footer}</div>}
      </Dialog.Body>
    </Dialog>
  );
}
