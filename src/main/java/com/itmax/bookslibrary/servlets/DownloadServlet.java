package com.itmax.bookslibrary.servlets;

import com.itmax.bookslibrary.models.Book;
import com.itmax.bookslibrary.utils.Db;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;

@WebServlet("/download/*")
public class DownloadServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String pathInfo = req.getPathInfo();

        if (pathInfo == null || pathInfo.length() < 2) {
            resp.setStatus(400);
            resp.getWriter().print("Id missing or empty");

            return;
        }

        String bookId = pathInfo.substring(1);
        Book book = Db.getBookOrm().getBookById(bookId);

        if (book == null) {
            resp.setStatus(404);
            resp.getWriter().print("Book not found");

            return;
        }

        String fullName = req.getServletContext().getRealPath("/uploads") + "/" + book.getCover();
        File file = new File(fullName);

        if (!file.exists()) {
            resp.setStatus(404);
            resp.getWriter().print("File not found");

            return;
        }

        resp.setContentType(req.getServletContext().getMimeType(fullName));
        resp.setHeader(
                "Content-Disposition",
                "attachment; filename=\"book"
                        + book.getCover().substring(book.getCover().lastIndexOf("."))
                        + "\"");
        resp.setContentLengthLong(file.length());

        OutputStream out = resp.getOutputStream();
        byte[] buf = new byte[512];
        int n;
        try (InputStream inp = new FileInputStream(file)) {
            while ((n = inp.read(buf)) != -1) {
                out.write(buf, 0, n);
            }
        } catch (IOException ex) {
            System.err.println("DownloadServlet: " + ex.getMessage());

            resp.setStatus(418);
            resp.getWriter().print("IO error");
        }
    }
}
