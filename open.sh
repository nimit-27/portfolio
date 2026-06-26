#!/bin/bash

# IntelliJ path autodetection (Windows-friendly)
find_idea_exe() {
    # echo "Finding intellij path..."
  if [[ "$OS" == "Windows_NT" ]]; then
    # Windows: .exe may not show as -x in Git Bash; just check file exists (-f)
    if [[ -n "$INTELLIJ_HOME" && -f "$INTELLIJ_HOME/bin/idea64.exe" ]]; then
      echo "$INTELLIJ_HOME/bin/idea64.exe"; return 0
    fi
    if [[ -n "$IDEA_HOME" && -f "$IDEA_HOME/bin/idea64.exe" ]]; then
      echo "$IDEA_HOME/bin/idea64.exe"; return 0
    fi

    # Try Windows PATH
    local via_where
    via_where="$(which idea64.exe 2>/dev/null | tr -d '\r' | head -n1)"
    # via_where="$(cmd.exe /c "where idea64.exe" 2>/dev/null | tr -d '\r' | head -n1)"
    if [[ -n "$via_where" && -f "$via_where" ]]; then
      echo "$via_where"; return 0
    fi

  else
    # Linux/macOS: use the launcher script and require executable (-x)
    if [[ -n "$INTELLIJ_HOME" && -x "$INTELLIJ_HOME/bin/idea.sh" ]]; then
      echo "$INTELLIJ_HOME/bin/idea.sh"; return 0
    fi
    if [[ -n "$IDEA_HOME" && -x "$IDEA_HOME/bin/idea.sh" ]]; then
      echo "$IDEA_HOME/bin/idea.sh"; return 0
    fi

    # Common fallback paths (optional)
    for base in /opt /usr/local /Applications; do
      if [[ -x "$base/IntelliJ IDEA.app/Contents/MacOS/idea" ]]; then
        echo "$base/IntelliJ IDEA.app/Contents/MacOS/idea"; return 0
      fi
      if [[ -x "$base/idea/bin/idea.sh" ]]; then
        echo "$base/idea/bin/idea.sh"; return 0
      fi
    done
  fi

  return 1
}


#Resolve the script's directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
echo "${BASH_SOURCE[0]}"
echo "$(dirname "${BASH_SOURCE[0]}")"
echo "$SCRIPT_DIR"

# Define paths
# REACT_DIR="$SCRIPT_DIR/ui"
# JAVA_DIR="$SCRIPT_DIR/api"
REACT_DIR="./ui"
JAVA_DIR="./api"
HARDCODED_IDEA="/c/Program Files/JetBrains/IntelliJ IDEA Community Edition 2025.2.2/bin/idea64.exe"
echo "Frontend Directory -> ${REACT_DIR}"
echo "Backend Directory -> ${JAVA_DIR}"
IDEA="$(find_idea_exe || echo "$HARDCODED_IDEA")"

# Initial flags
open=false
run_react=false
run_java=false

# Parse arguments
for arg in "$@"; do
    echo "$arg"
    case "$arg" in
        -o|--open)
            open=true
            ;;
        -r|--run-react)
            run_react=true
            ;;
        -j|--run_java)
            run_java=true
            ;;
        -*)
            #Support combined short flags like -ors
            for((i=1; i<${#arg}; i++)); do
                ch="${arg:i:1}"
                case "$ch" in
                    o) open=true ;;
                    r) run_react=true ;;
                    j) run_java=true ;;
                    *) echo "Unknown flag: -$ch"; exit 1;;
                esac
            done
            ;;
        *) echo "Unknown argument: -$arg"; exit 1;;
    esac
done

#Execute actions
$open && (
    echo "📂 Opening UI and API in VSCode and Intellij respectively..."
    code "$REACT_DIR" >/dev/null 2>&1 &
    "$IDEA" "$JAVA_DIR" & 
)

$run_react && (
    echo "🚀 Starting React app.."
    wt -w 0 nt --title "React Server" bash -c "cd '$REACT_DIR' && npm start"
)

$run_java && (
    echo "🛠️ Starting Java backend server"
    wt -w 0 nt --title "React Server" bash -c "cd '$REACT_DIR' && npm start"
)

