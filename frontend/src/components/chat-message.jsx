import ReactMarkdown from "react-markdown";

export default function ChatMessage({ message }) {
  const isUser = message.sender === "You";

  return (
    <div
      className={`flex items-start gap-3 mb-4 ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      {!isUser && (
        <div className="flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-md bg-primary/10">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-primary"
          >
            <rect width="16" height="16" x="4" y="4" rx="2" ry="2" />
            <path d="M9 9h6v6H9z" />
            <path d="M9 3v2" />
            <path d="M15 3v2" />
            <path d="M9 19v2" />
            <path d="M15 19v2" />
            <path d="M3 9h2" />
            <path d="M3 15h2" />
            <path d="M19 9h2" />
            <path d="M19 15h2" />
          </svg>
        </div>
      )}

      {/* <div
        className={`rounded-lg px-3 py-2 max-w-[85%] text-sm ${
          isUser ? "bg-primary text-primary-foreground" : "bg-muted"
        }`}
      >
        {message.text}
      </div> */}
     <div className="prose prose-sm dark:prose-invert max-w-[80%] whitespace-pre-wrap break-words">
  <ReactMarkdown>{message.text}</ReactMarkdown>
</div>

      {isUser && (
        <div className="flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-md bg-primary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-primary-foreground"
          >
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        </div>
      )}
    </div>
  );
}
