using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace SmarterBalanced.SpanishEnglishDemarcation.Controllers
{
    public class SedControllerBaseController : Controller
    {
        public virtual IActionResult Index()
        {
            return RedirectToAction("Item2803");
        }

        public virtual IActionResult Item2803()
        {
            return View();
        }

        public virtual IActionResult Item3298()
        {
            return View();
        }

        public virtual IActionResult Item3318()
        {
            return View();
        }

        public virtual IActionResult Item3527()
        {
            return View();
        }

        public virtual IActionResult Item3561()
        {
            return View();
        }

        public virtual IActionResult Item3593()
        {
            return View();
        }

        public virtual IActionResult Item3599()
        {
            return View();
        }

        public virtual IActionResult Item3607()
        {
            return View();
        }

        public virtual IActionResult Item3627()
        {
            return View();
        }

        public virtual IActionResult Item3635()
        {
            return View();
        }

        public virtual IActionResult Item3694()
        {
            return View();
        }

        public virtual IActionResult Item3695()
        {
            return View();
        }
    }
}
