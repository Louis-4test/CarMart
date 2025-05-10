<?php
header('Content-Type: application/json');

$servername = "localhost";
$username = "root"; 
$password = ""; 
$dbname = "carmartdb";

try {
    // Create a new PDO instance
    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    // Set the PDO error mode to exception
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

} catch (PDOException $e) {
    die("Connection failed: " . $e->getMessage());
}

// Handle request type
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (isset($_GET['action'])) {
        switch ($_GET['action']) {
            case 'fetchTraffic':
                $stmt = $conn->query("SELECT * FROM traffic ORDER BY id DESC LIMIT 1");
                $trafficData = $stmt->fetch(PDO::FETCH_ASSOC);
                echo json_encode($trafficData);
                break;

            case 'fetchFeedback':
                $stmt = $conn->query("SELECT * FROM feedback ORDER BY feedback_date DESC");
                $feedbackData = $stmt->fetchAll(PDO::FETCH_ASSOC);
                echo json_encode($feedbackData);
                break;

            case 'viewFeedback':
                if (isset($_GET['id'])) {
                    $id = intval($_GET['id']); // Ensure the ID is an integer
                    $stmt = $conn->prepare("SELECT * FROM feedback WHERE id = :id");
                    $stmt->bindParam(':id', $id, PDO::PARAM_INT);
                    $stmt->execute();
                    $feedbackDetail = $stmt->fetch(PDO::FETCH_ASSOC);

                    if ($feedbackDetail) {
                        echo json_encode($feedbackDetail);
                    } else {
                        echo json_encode(["message" => "Feedback not found"]);
                    }
                } else {
                    echo json_encode(["message" => "ID not provided"]);
                }
                break;

            default:
                echo json_encode(["message" => "Invalid action"]);
                break;
        }
    }
} elseif ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['action'])) {
    switch ($_POST['action']) {
        case 'submitFeedback':
            $customerName = $_POST['customer_name'];
            $feedbackText = $_POST['feedback_text'];

            $stmt = $conn->prepare("INSERT INTO feedback (customer_name, feedback_text) VALUES (:customer_name, :feedback_text)");
            $stmt->bindParam(':customer_name', $customerName, PDO::PARAM_STR);
            $stmt->bindParam(':feedback_text', $feedbackText, PDO::PARAM_STR);
            if ($stmt->execute()) {
                echo json_encode(["message" => "Feedback submitted successfully"]);
            } else {
                echo json_encode(["message" => "Error submitting feedback"]);
            }
            break;

        case 'updateTraffic':
            // Increment traffic counts
            $stmt = $conn->prepare("UPDATE traffic SET visitors_today = visitors_today + 1, visitors_this_month = visitors_this_month + 1, total_visitors = total_visitors + 1");
            if ($stmt->execute()) {
                echo json_encode(["message" => "Traffic updated"]);
            } else {
                echo json_encode(["message" => "Error updating traffic"]);
            }
            break;

        case 'deleteFeedback':
            if (isset($_POST['id'])) {
                $id = intval($_POST['id']);
                $stmt = $conn->prepare("DELETE FROM feedback WHERE id = :id");
                $stmt->bindParam(':id', $id, PDO::PARAM_INT);
                if ($stmt->execute()) {
                    echo json_encode(["message" => "Feedback deleted successfully"]);
                } else {
                    echo json_encode(["message" => "Error deleting feedback"]);
                }
            } else {
                echo json_encode(["message" => "ID not provided"]);
            }
            break;

        default:
            echo json_encode(["message" => "Invalid action"]);
            break;
    }
}

// Close the connection
$conn = null;
?>
