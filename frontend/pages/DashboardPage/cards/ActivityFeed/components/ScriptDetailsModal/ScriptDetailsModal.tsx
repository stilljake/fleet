import React from "react";

import Modal from "components/Modal";
import Button from "components/buttons/Button";
import TooltipWrapper from "components/TooltipWrapper";
import Icon from "components/Icon";
import Textarea from "components/Textarea";

const baseClass = "script-details-modal";

const SCRIPT_RUNNING_CODE = -999;
const HOST_NOT_REACHED_CODE = -998;

interface IScriptContentProps {
  content: string;
}

const ScriptContent = ({ content }: IScriptContentProps) => {
  return (
    <div className={`${baseClass}__script-content`}>
      <span>Script content:</span>
      <Textarea className={`${baseClass}__script-content-textarea`}>
        {content}
      </Textarea>
    </div>
  );
};

interface IStatusMessageProps {
  exitCode: number;
  message: string;
  runtime: number;
}

const StatusMessage = ({ exitCode, message, runtime }: IStatusMessageProps) => {
  let statusMessage: JSX.Element;

  // script timed out error
  if (runtime > 30) {
    statusMessage = (
      <p>
        <Icon name="error-outline" />
        Timeout error: Fleet stopped the script after 30 seconds to protect host
        performance.
      </p>
    );
    // host could not be reached
  } else if (exitCode === HOST_NOT_REACHED_CODE) {
    statusMessage = (
      <p>
        <Icon name="error-outline" />
        The script ran but Fleet couldn&apos;t get its output because Fleet
        didn&apos;t hear back from the host.
      </p>
    );
    // script still running
  } else if (exitCode === SCRIPT_RUNNING_CODE) {
    statusMessage = (
      <p>
        <Icon name="pending-partial" />
        Script is running. To see if the script finished, close this modal and
        open it again.
      </p>
    );
  } else {
    // 0 or 1 exit code with message
    statusMessage = (
      <p>
        <Icon name={exitCode === 0 ? "success-partial" : "error-outline"} />
        {`Exit code: ${exitCode} (${message})`}
      </p>
    );
  }

  return <div className={`${baseClass}__status-message`}>{statusMessage}</div>;
};

interface IScriptOutputProps {
  output: string;
}

const ScriptOutput = ({ output }: IScriptOutputProps) => {
  return (
    <div className={`${baseClass}__script-output`}>
      <p>
        The{" "}
        <TooltipWrapper tipContent="Fleet records the last 10,000 characters to prevent downtime.">
          output recorded
        </TooltipWrapper>{" "}
        when <b>Marko&apos;s MacBook Pro</b> ran the script above:
      </p>
      <Textarea>{output}</Textarea>
    </div>
  );
};

interface IScriptResultProps {
  exitCode: number;
  message: string;
  output: string;
  runtime: number;
}

const ScriptResult = ({
  exitCode,
  message,
  output,
  runtime,
}: IScriptResultProps) => {
  const showOutputText = exitCode !== -998 && exitCode !== -999 && runtime < 30;

  return (
    <div className={`${baseClass}__script-result`}>
      <StatusMessage exitCode={exitCode} message={message} runtime={runtime} />
      {showOutputText && <ScriptOutput output={output} />}
    </div>
  );
};

interface IScriptDetailsModalProps {
  onCancel: () => void;
}

const ScriptDetailsModal = ({ onCancel }: IScriptDetailsModalProps) => {
  const TEST_DATA = {
    script_contents: "test contentsss",
    exit_code: 1,
    output: "test output",
    message: "test message",
    runtime: 40,
  };

  return (
    <Modal
      title={"Script Details"}
      onExit={onCancel}
      onEnter={onCancel}
      className={baseClass}
    >
      <>
        <div className={`${baseClass}__modal-content`}>
          <ScriptContent content={TEST_DATA.script_contents} />
          <ScriptResult
            exitCode={TEST_DATA.exit_code}
            message={TEST_DATA.message}
            output={TEST_DATA.output}
            runtime={TEST_DATA.runtime}
          />
        </div>
        <div className="modal-cta-wrap">
          <Button onClick={onCancel} variant="brand">
            Done
          </Button>
        </div>
      </>
    </Modal>
  );
};

export default ScriptDetailsModal;
