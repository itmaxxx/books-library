<%@ page import="com.itmax.bookslibrary.utils.Db" %>
<%@ page contentType="text/html;charset=UTF-8" %>
<%
    String confirm = request.getParameter("confirm");
%>
<html>
<head>
    <title>Library</title>
</head>
<body>
<h1>DB is empty</h1>
<% if (confirm == null) { %>
<a href="?confirm=true">INSTALL</a>
<% } else if (Db.getBookOrm().installTable()) { %>
<b>CREATED</b>
<script>
    setTimeout(
        () => {
            window.location.href = window.location.pathname
        },
        1000
    );
</script>
<% } else { %>
<i>CREATE ERROR see server logs</i>
<% } %>

</body>
</html>
